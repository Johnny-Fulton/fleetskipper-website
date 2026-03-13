// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent, upsertSubscriptionFromWebhook } from "@/lib/services/billing";
import type { SubscriptionStatus } from '@/lib/entitlements';
import Stripe from 'stripe';

const BILLING_ENABLED = process.env.ENABLE_BILLING === 'true';

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  
  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  // If billing is disabled, acknowledge webhook but don't process
  if (!BILLING_ENABLED || !process.env.STRIPE_WEBHOOK_SECRET) {
    // Billing disabled or webhook secret missing, skipping webhook
    return NextResponse.json({ received: true });
  }

  let event: Stripe.Event;

  try {
    const buf = await req.arrayBuffer();
    
    // Verify webhook signature
    event = constructWebhookEvent(
      Buffer.from(buf),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
  } catch (err) {
    // Webhook signature verification failed
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Process webhook event: ${event.type}

  // Handle events with ONE WRITE principle
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Session contains subscription ID after successful checkout
        if (session.subscription && typeof session.subscription === 'string') {
          // Fetch full subscription details from Stripe
          const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2025-08-27.basil',
          });
          
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          await handleSubscriptionChange(subscription);
          
          // Checkout completed for org
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object as Stripe.Subscription;
        // TODO: Queue trial ending email
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        // TODO: Queue receipt email
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        // TODO: Queue payment failed email
        // The subscription status will be updated to 'past_due' automatically
        break;
      }

      case 'customer.subscription.paused':
      case 'customer.subscription.resumed': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      default:
        // Unhandled event type - acknowledge but don't process
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    // Webhook processing error - log to monitoring service in production
    // Return success to avoid retries for processing errors
    // Log to error tracking service in production
    return NextResponse.json({ received: true });
  }
}

// Helper to process subscription changes (ONE WRITE)
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // Map Stripe status to our SubscriptionStatus type
  const status = subscription.status as SubscriptionStatus;
  
  // Extract the current price ID (could be multiple items, we take first)
  const priceId = subscription.items?.data?.[0]?.price?.id || '';
  
  // Get orgId from metadata (set during checkout)
  const orgId = subscription.metadata?.orgId;
  
  if (!orgId) {
    // Missing orgId in subscription metadata - skip processing
    return;
  }
  
  // ONE WRITE to database with idempotency built into upsert
  await upsertSubscriptionFromWebhook({
    stripeSubscriptionId: subscription.id,
    stripeCustomerId: subscription.customer as string,
    stripePriceId: priceId,
    status,
    currentPeriodEnd: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // Default to 30 days from now
    cancelAtPeriodEnd: false,
    trialEnd: null,
    metadata: {
      orgId,
      ...subscription.metadata,
    },
  });
  
  // Any additional async operations (emails, analytics) happen after the write
  // but don't block the webhook response
  if (status === 'active' && subscription.metadata?.isNew === 'true') {
    // TODO: Queue welcome email for new subscription
  }
  
  if (status === 'canceled') {
    // TODO: Queue cancellation email
  }
  
  if (status === 'past_due') {
    // TODO: Queue payment failure email
  }
}

// Required config for App Router
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';