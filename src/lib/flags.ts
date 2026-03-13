// lib/flags.ts
type Flags = {
  // UI Features
  ENABLE_TESTIMONIALS: boolean;
  ENABLE_STICKY_CTA: boolean;
  ENABLE_ALT_HERO: boolean;
  ENABLE_CONTACT_FORM: boolean;
  ENABLE_DOWNLOAD_FORM: boolean;
  USE_LEGACY_NAV: boolean;
  
  // Billing Features
  ENABLE_BILLING: boolean;
  SHOW_PRICING: boolean;
  ALLOW_CHECKOUT: boolean;
  ENFORCE_SUBSCRIPTIONS: boolean;
  
  // Auth Features
  ENABLE_AUTH: boolean;
  REQUIRE_EMAIL_VERIFICATION: boolean;
};

const flags: Flags = {
  // UI Features
  ENABLE_TESTIMONIALS: false, // Disabled as discussed - inauthentic
  ENABLE_STICKY_CTA: false,
  ENABLE_ALT_HERO: false,
  ENABLE_CONTACT_FORM: false, // Enable when ready
  ENABLE_DOWNLOAD_FORM: false, // Enable when ready
  USE_LEGACY_NAV: false,
  
  // Billing Features - Ready to enable
  ENABLE_BILLING: true, // Master switch for billing
  SHOW_PRICING: true, // Show pricing page
  ALLOW_CHECKOUT: true, // Allow checkout process
  ENFORCE_SUBSCRIPTIONS: false, // Enforce subscription requirement for app access
  
  // Auth Features - Not yet implemented
  ENABLE_AUTH: false,
  REQUIRE_EMAIL_VERIFICATION: false,
};

export function getFlag<K extends keyof Flags>(key: K): Flags[K] {
  // In production, could read from env vars
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
    const envKey = `NEXT_PUBLIC_${key}`;
    const envValue = process.env[envKey];
    if (envValue !== undefined) {
      return envValue === 'true';
    }
  }
  return flags[key];
}

// Export all flags for convenience
export const featureFlags = {
  // UI
  testimonials: () => getFlag('ENABLE_TESTIMONIALS'),
  stickyCta: () => getFlag('ENABLE_STICKY_CTA'),
  altHero: () => getFlag('ENABLE_ALT_HERO'),
  contactForm: () => getFlag('ENABLE_CONTACT_FORM'),
  downloadForm: () => getFlag('ENABLE_DOWNLOAD_FORM'),
  legacyNav: () => getFlag('USE_LEGACY_NAV'),
  
  // Billing
  billing: () => getFlag('ENABLE_BILLING'),
  showPricing: () => getFlag('SHOW_PRICING'),
  allowCheckout: () => getFlag('ALLOW_CHECKOUT'),
  enforceSubscriptions: () => getFlag('ENFORCE_SUBSCRIPTIONS'),
  
  // Auth
  auth: () => getFlag('ENABLE_AUTH'),
  emailVerification: () => getFlag('REQUIRE_EMAIL_VERIFICATION'),
};