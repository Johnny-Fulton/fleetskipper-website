// lib/actions/createCheckout.ts
"use server";

import { redirect } from 'next/navigation';
import { createCheckoutSession } from '@/lib/services/billing';
import { plans } from '@/lib/entitlements';

export type CheckoutFormState = {
  error?: string;
};

export async function createCheckout(
  planKey: keyof typeof plans,
  billingPeriod: 'monthly' | 'annual' = 'monthly'
): Promise<void> {
  try {
    // TODO: Get current user/org from session
    // const session = await getSession();
    // if (!session?.orgId) {
    //   throw new Error('Please sign in to continue');
    // }
    
    // Mock data for now
    const mockOrg = {
      id: 'org_demo',
      email: 'support@seaready.co.uk',
    };
    
    const plan = plans[planKey];
    const priceId = plan.stripePriceIds[billingPeriod];
    
    if (!priceId) {
      throw new Error('This plan is not available for the selected billing period');
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
    
    const session = await createCheckoutSession({
      orgId: mockOrg.id,
      email: mockOrg.email,
      priceId,
      successUrl: `${baseUrl}/account/billing?success=true&plan=${planKey}`,
      cancelUrl: `${baseUrl}/pricing?canceled=true`,
      trialDays: planKey === 'starter' ? 14 : undefined, // 14-day trial for Starter
      metadata: {
        planKey,
        billingPeriod,
      },
    });

    if (!session.url) {
      throw new Error('Failed to create checkout session');
    }

    // Redirect to Stripe Checkout
    redirect(session.url);
  } catch (error) {
    console.error('Checkout error:', error);
    throw new Error('Unable to create checkout session. Please try again.');
  }
}