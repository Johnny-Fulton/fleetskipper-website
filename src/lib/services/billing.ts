// lib/services/billing.ts
// Stripe wrapper - no direct SDK usage in pages/components

import type { SubscriptionStatus } from '@/lib/entitlements';
import Stripe from 'stripe';

// Flag to enable/disable billing features
const BILLING_ENABLED = process.env.ENABLE_BILLING === 'true';

// Initialize Stripe only if billing is enabled and key exists
const stripe = BILLING_ENABLED && process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { 
      apiVersion: '2025-08-27.basil',
      typescript: true,
    })
  : null;

export interface CustomerData {
  orgId: string;
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}

export interface CheckoutOptions {
  orgId: string;
  email: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  trialDays?: number;
  metadata?: Record<string, string>;
}

export interface Subscription {
  id: string;
  orgId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  status: SubscriptionStatus;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEnd?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Get or create Stripe customer with idempotency
export async function getOrCreateCustomer(data: CustomerData): Promise<string> {
  if (!BILLING_ENABLED || !stripe) {
    return `cus_mock_${data.orgId}`;
  }

  try {
    // TODO: Check DB for existing customer by orgId
    // const existing = await db.customers.findUnique({ 
    //   where: { orgId: data.orgId } 
    // });
    // if (existing?.stripeCustomerId) {
    //   return existing.stripeCustomerId;
    // }
    
    // Create customer in Stripe with idempotency key
    const customer = await stripe.customers.create({
      email: data.email,
      name: data.name,
      metadata: { 
        orgId: data.orgId, 
        ...data.metadata 
      },
    }, {
      idempotencyKey: `create-customer-${data.orgId}`,
    });
    
    // TODO: Store mapping in database
    // await db.customers.create({
    //   data: {
    //     orgId: data.orgId,
    //     stripeCustomerId: customer.id,
    //   },
    // });
    
    return customer.id;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw new Error('Failed to create customer');
  }
}

export async function createCheckoutSession(opts: CheckoutOptions) {
  if (!BILLING_ENABLED || !stripe) {
    return {
      id: 'cs_mock_123',
      url: `https://checkout.stripe.com/mock/${opts.priceId}`,
    };
  }

  const customerId = await getOrCreateCustomer({
    orgId: opts.orgId,
    email: opts.email,
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ 
        price: opts.priceId, 
        quantity: 1 
      }],
      success_url: opts.successUrl,
      cancel_url: opts.cancelUrl,
      allow_promotion_codes: true,
      automatic_tax: { 
        enabled: true 
      },
      tax_id_collection: { 
        enabled: true  // UK VAT collection
      },
      subscription_data: opts.trialDays ? {
        trial_period_days: opts.trialDays,
        metadata: opts.metadata,
      } : {
        metadata: opts.metadata,
      },
      metadata: {
        orgId: opts.orgId,
      },
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
      billing_address_collection: 'required',
    });

    return {
      id: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
}

export async function createPortalSession(
  customerId: string, 
  returnUrl: string
) {
  if (!BILLING_ENABLED || !stripe) {
    return {
      id: 'bps_mock_123',
      url: `https://billing.stripe.com/mock/portal/${customerId}`,
    };
  }

  try {
    const session = await stripe.billingPortal.sessions.create({ 
      customer: customerId, 
      return_url: returnUrl 
    });

    return {
      id: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw new Error('Failed to create portal session');
  }
}

export async function cancelSubscription(
  subscriptionId: string,
  immediately = false
) {
  if (!BILLING_ENABLED || !stripe) {
    return {
      id: subscriptionId,
      cancel_at_period_end: !immediately,
      status: immediately ? 'canceled' : 'active',
    };
  }

  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: !immediately,
      ...(immediately && { cancel_at: Math.floor(Date.now() / 1000) }),
    });

    return {
      id: subscription.id,
      cancel_at_period_end: subscription.cancel_at_period_end,
      status: subscription.status,
    };
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw new Error('Failed to cancel subscription');
  }
}

export async function resumeSubscription(subscriptionId: string) {
  if (!BILLING_ENABLED || !stripe) {
    return {
      id: subscriptionId,
      cancel_at_period_end: false,
      status: 'active',
    };
  }

  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });

    return {
      id: subscription.id,
      cancel_at_period_end: subscription.cancel_at_period_end,
      status: subscription.status,
    };
  } catch (error) {
    console.error('Error resuming subscription:', error);
    throw new Error('Failed to resume subscription');
  }
}

// For webhook processing - single write to DB with idempotency
export async function upsertSubscriptionFromWebhook(data: {
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  status: SubscriptionStatus;
  currentPeriodEnd: number; // Unix timestamp
  cancelAtPeriodEnd: boolean;
  trialEnd?: number | null;
  metadata?: Record<string, string>;
}): Promise<Subscription> {
  // ONE WRITE principle - single DB operation
  // TODO: Implement with real database
  // return db.subscriptions.upsert({
  //   where: { stripeSubscriptionId: data.stripeSubscriptionId },
  //   create: {
  //     orgId: data.metadata?.orgId || '',
  //     stripeCustomerId: data.stripeCustomerId,
  //     stripeSubscriptionId: data.stripeSubscriptionId,
  //     stripePriceId: data.stripePriceId,
  //     status: data.status,
  //     currentPeriodEnd: new Date(data.currentPeriodEnd * 1000),
  //     cancelAtPeriodEnd: data.cancelAtPeriodEnd,
  //     trialEnd: data.trialEnd ? new Date(data.trialEnd * 1000) : null,
  //   },
  //   update: {
  //     stripePriceId: data.stripePriceId,
  //     status: data.status,
  //     currentPeriodEnd: new Date(data.currentPeriodEnd * 1000),
  //     cancelAtPeriodEnd: data.cancelAtPeriodEnd,
  //     trialEnd: data.trialEnd ? new Date(data.trialEnd * 1000) : null,
  //     updatedAt: new Date(),
  //   },
  // });

  // Mock response for now
  return {
    id: 'sub_mock_123',
    orgId: data.metadata?.orgId || 'org_mock',
    stripeCustomerId: data.stripeCustomerId,
    stripeSubscriptionId: data.stripeSubscriptionId,
    stripePriceId: data.stripePriceId,
    status: data.status,
    currentPeriodEnd: new Date(data.currentPeriodEnd * 1000),
    cancelAtPeriodEnd: data.cancelAtPeriodEnd,
    trialEnd: data.trialEnd ? new Date(data.trialEnd * 1000) : null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// Helper to check if customer has any active subscription
export async function hasActiveSubscription(_orgId: string): Promise<boolean> {
  // TODO: Implement with real database
  // const sub = await db.subscriptions.findFirst({
  //   where: { 
  //     orgId, 
  //     status: { in: ['active', 'trialing'] } 
  //   },
  // });
  // return !!sub;
  
  return false; // Mock - no subscription by default
}

// Get subscription for an org
export async function getSubscriptionForOrg(_orgId: string): Promise<Subscription | null> {
  // TODO: Implement with real database
  // return db.subscriptions.findFirst({
  //   where: { orgId },
  //   orderBy: { createdAt: 'desc' },
  // });
  
  return null; // Mock - no subscription by default
}

// Verify Stripe webhook signature (export for webhook handler)
export function constructWebhookEvent(
  payload: Buffer,
  signature: string,
  secret: string
): Stripe.Event {
  if (!stripe) {
    throw new Error('Billing is not enabled');
  }
  return stripe.webhooks.constructEvent(payload, signature, secret);
}