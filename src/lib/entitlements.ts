// lib/entitlements.ts
// Central plan definitions - single source of truth for features

export const STRIPE_PRICE_IDS = {
  starter_monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY || 'price_starter_monthly',
  fleet_monthly: process.env.STRIPE_PRICE_FLEET_MONTHLY || 'price_fleet_monthly',
  enterprise_monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || 'price_enterprise_monthly',
  // Annual plans
  starter_annual: process.env.STRIPE_PRICE_STARTER_ANNUAL || 'price_starter_annual',
  fleet_annual: process.env.STRIPE_PRICE_FLEET_ANNUAL || 'price_fleet_annual',
} as const;

export const plans = {
  starter: { 
    name: 'Starter',
    vessels: 1, 
    users: 5, 
    exports: true,
    drills: true,
    defects: true,
    maintenance: true,
    offlineMode: true,
    support: 'email',
    price: 49,
    stripePriceIds: {
      monthly: STRIPE_PRICE_IDS.starter_monthly,
      annual: STRIPE_PRICE_IDS.starter_annual,
    }
  },
  fleet: { 
    name: 'Fleet',
    vessels: 10, 
    users: 50, 
    exports: true,
    drills: true,
    defects: true,
    maintenance: true,
    offlineMode: true,
    bulkExports: true,
    prioritySupport: true,
    support: 'priority',
    price: 199,
    stripePriceIds: {
      monthly: STRIPE_PRICE_IDS.fleet_monthly,
      annual: STRIPE_PRICE_IDS.fleet_annual,
    }
  },
  enterprise: { 
    name: 'Enterprise',
    vessels: 'unlimited' as const, 
    users: 'unlimited' as const, 
    exports: true,
    drills: true,
    defects: true,
    maintenance: true,
    offlineMode: true,
    bulkExports: true,
    sso: true, 
    customOnboarding: true,
    dedicatedSupport: true,
    support: 'dedicated',
    price: 'custom' as const,
    stripePriceIds: {
      monthly: STRIPE_PRICE_IDS.enterprise_monthly,
      annual: null, // Contact sales
    }
  },
} as const;

export type PlanKey = keyof typeof plans;
export type Plan = typeof plans[PlanKey];

export function getPlanFromPriceId(priceId?: string): PlanKey {
  if (!priceId) return 'starter';
  
  // Check each plan's price IDs
  for (const [key, plan] of Object.entries(plans)) {
    if (plan.stripePriceIds.monthly === priceId || 
        plan.stripePriceIds.annual === priceId) {
      return key as PlanKey;
    }
  }
  
  return 'starter'; // Default fallback
}

export type SubscriptionStatus = 
  | 'active'
  | 'trialing' 
  | 'past_due'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'unpaid';

export function canAccessApp(status: SubscriptionStatus): boolean {
  return status === 'active' || status === 'trialing';
}

export function getStatusColor(status: SubscriptionStatus): string {
  switch (status) {
    case 'active':
      return 'text-green-700 bg-green-50 ring-green-600/10';
    case 'trialing':
      return 'text-blue-700 bg-blue-50 ring-blue-600/10';
    case 'past_due':
      return 'text-orange-700 bg-orange-50 ring-orange-600/10';
    case 'canceled':
      return 'text-gray-700 bg-gray-50 ring-gray-600/10';
    default:
      return 'text-red-700 bg-red-50 ring-red-600/10';
  }
}

// Feature gates for the app
export function checkFeatureAccess(
  planKey: PlanKey,
  feature: keyof Plan
): boolean {
  const plan = plans[planKey];
  return !!plan[feature];
}

// For API responses to the app
export function getEntitlements(
  planKey: PlanKey,
  status: SubscriptionStatus
) {
  const plan = plans[planKey];
  return {
    planKey,
    planName: plan.name,
    status,
    canAccess: canAccessApp(status),
    limits: {
      vessels: plan.vessels,
      users: plan.users,
      bulkExports: 'bulkExports' in plan ? plan.bulkExports : false,
      sso: 'sso' in plan ? plan.sso : false,
    },
    features: {
      drills: plan.drills,
      defects: plan.defects,
      maintenance: plan.maintenance,
      offlineMode: plan.offlineMode,
      exports: plan.exports,
    },
  };
}