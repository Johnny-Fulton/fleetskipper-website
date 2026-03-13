// Feature-focused content for SeaReady App page
// Universal maritime SMS positioning (non-WBC3 specific)
// Targets: Commercial vessels, offshore support, survey vessels, any maritime operator

export const appContent = {
  hero: {
    badge: "Beta Q1 2026",
    h1: "Digital SMS Management for Maritime Operations",
    subtitle: "Track crew certifications, manage maintenance, schedule drills, and stay compliant — all offline-first and auto-synced.",
    credibility: "Built by Mariners • Offline-First • Works on Any Vessel",
    ctaPrimary: "Join Beta Waitlist",
    ctaSecondary: "See How It Works",
    proofPoint: "Pre-configured for UK Workboat Code • Adaptable to ISM Code, MLC, or your company's requirements",
  },

  coreFeatures: {
    eyebrow: "All-In-One Platform",
    title: "Everything You Need to Manage Your SMS Digitally",
    subtitle: "From crew certification to risk assessments — manage compliance in one offline-capable platform.",
    features: [
      {
        icon: "users",
        title: "Crew Certification Tracking",
        description: "Track qualifications, certificates, and training with color-coded competence matrix. Automatic expiry alerts mean you never miss a renewal.",
        benefits: ["Certificate expiry warnings", "Competence matrix", "Training records", "Multi-vessel crew assignments"],
      },
      {
        icon: "wrench",
        title: "Planned Maintenance Management",
        description: "Pre-loaded maintenance schedules for common equipment, fully customizable for your specific vessel and manufacturer requirements.",
        benefits: ["107+ pre-configured items", "Custom schedules", "Job card system", "Photo documentation"],
      },
      {
        icon: "bell",
        title: "Drill & Training Management",
        description: "Schedule and log safety drills (fire, MOB, abandon ship, pollution). Auto-scheduling based on regulatory requirements.",
        benefits: ["Comprehensive drill library", "Auto scheduling", "Digital signatures", "Compliance tracking"],
      },
      {
        icon: "clock",
        title: "Hours of Rest Tracking",
        description: "Automatic compliance calculations for MGN 505 (10h/day, 77h/week). Monthly grid view matching traditional HOR books.",
        benefits: ["Automatic calculations", "Monthly grid view", "Compliance alerts", "Digital signatures"],
      },
      {
        icon: "shield",
        title: "Risk Assessment Tools",
        description: "Built-in risk assessment framework with hazard library, risk register, and auto-calculating matrices.",
        benefits: ["Hazard library", "Risk matrices", "Control measures", "Review tracking"],
      },
      {
        icon: "clipboard",
        title: "Equipment Registers",
        description: "Manage all safety and operational equipment: LSA, FFE, Navigation, Radio, Medical, Machinery, and Electrical.",
        benefits: ["Pre-configured categories", "Service history", "Certificate tracking", "Photo uploads"],
      },
    ],
  },

  offlineFirst: {
    eyebrow: "Built for Life at Sea",
    title: "100% Offline Capable — Sync When You're Ready",
    subtitle: "We know you don't always have internet at sea. The SeaReady App works completely offline and syncs automatically when you're back in port.",
    features: [
      {
        icon: "wifi-off",
        title: "Works Without Internet",
        description: "Complete all tasks offline. Data stored securely on your device.",
      },
      {
        icon: "refresh",
        title: "Automatic Sync",
        description: "When you reconnect, changes sync automatically across all devices.",
      },
      {
        icon: "smartphone",
        title: "Multi-Platform",
        description: "iOS, Android, and Web apps. Use on phone, tablet, or desktop.",
      },
      {
        icon: "lock",
        title: "Secure & Backed Up",
        description: "Data encrypted and backed up to the cloud when synced.",
      },
    ],
  },

  customization: {
    eyebrow: "Flexible & Customizable",
    title: "Your Operations, Your Way",
    subtitle: "The SeaReady App comes pre-configured with industry-standard templates — but you're not locked in. Customize it yourself or hire us to build bespoke features.",
    tiers: [
      {
        title: "Self-Service Customization",
        badge: "Included in Essentials",
        description: "Edit all templates, checklists, and procedures yourself. Full control over your SMS content.",
        features: [
          "Edit maintenance schedules",
          "Customize checklists",
          "Add/remove procedures",
          "Configure alerts and notifications",
          "Adjust workflows to your operations",
        ],
      },
      {
        title: "Professional Setup Services",
        badge: "Optional Add-On",
        description: "We configure the app for you based on your vessel, operations, and regulatory requirements. Delivered ready-to-use.",
        features: [
          "Expert-led configuration",
          "Custom procedure templates",
          "Company-specific checklists",
          "Regulatory framework setup (ISM, MLC, etc.)",
          "Training and onboarding included",
        ],
      },
      {
        title: "Bespoke Feature Development",
        badge: "Case-by-Case",
        description: "Need a feature that doesn't exist? We can build it into your app instance. Subject to feasibility review.",
        features: [
          "Custom compliance modules",
          "Integration with existing systems",
          "Specialized workflows",
          "Industry-specific features",
          "White-label options available",
        ],
      },
    ],
    cta: "Request Custom Setup Quote",
  },

  universalCompliance: {
    eyebrow: "Works for Any Maritime Operation",
    title: "Pre-Configured for UK Workboat Code, Adaptable to Anything",
    subtitle: "Whether you operate under WBC3, ISM Code, MLC, or custom company requirements — the SeaReady App adapts to your needs.",
    regulations: [
      {
        name: "UK Workboat Code (WBC3)",
        description: "Pre-loaded with all Annex 8 requirements. Ready out of the box for UK workboat operators.",
        status: "Built-in",
      },
      {
        name: "ISM Code (International)",
        description: "Adaptable framework for ISM Code compliance. We can configure it for your specific vessel type.",
        status: "Customizable",
      },
      {
        name: "Maritime Labour Convention (MLC)",
        description: "Crew welfare tracking, Hours of Rest, and training records aligned with MLC requirements.",
        status: "Customizable",
      },
      {
        name: "Company-Specific Requirements",
        description: "Your company has unique procedures? We can build them into your app instance.",
        status: "Professional Setup",
      },
    ],
    vesselTypes: [
      "Workboats (CTVs, pilot boats, tugs)",
      "Commercial Vessels (cargo, passenger)",
      "Offshore Support (wind farm, oil & gas)",
      "Survey & Hydrographic Vessels",
      "Dive Support & ROV Operations",
      "Fishing Vessels",
    ],
  },

  pricing: {
    eyebrow: "Simple, Transparent Pricing",
    title: "From £30/month — Scale as You Grow",
    subtitle: "No hidden fees. No per-user charges. Just straightforward pricing based on your fleet size.",
    note: "Essentials tier launching Q1 2026. Professional and Enterprise tiers coming 2027-2028.",
    tiers: [
      {
        name: "Essentials",
        tagline: "Available Q1 2026",
        description: "Perfect for workboat operators needing WBC3 compliance",
        vesselPricing: [
          { vessels: "1 vessel", price: "£30", period: "per month" },
          { vessels: "2-3 vessels", price: "£60", period: "per month" },
          { vessels: "4-6 vessels", price: "£100", period: "per month" },
          { vessels: "7-10 vessels", price: "£150", period: "per month" },
        ],
        features: [
          "SMS framework & document library",
          "Equipment tracking & maintenance",
          "Basic crew management",
          "Risk assessments",
          "Offline-first mobile & web apps",
          "Self-service customization",
          "Email support",
        ],
        cta: "Join Beta Waitlist",
        highlight: true,
      },
      {
        name: "Professional",
        tagline: "Coming 2027",
        description: "For fishing vessels, small coasters, and ferry operators (ISM/DSM compliance)",
        vesselPricing: [
          { vessels: "1 vessel", price: "£100", period: "per month" },
          { vessels: "2-3 vessels", price: "£150", period: "per month" },
          { vessels: "4-6 vessels", price: "£200", period: "per month" },
          { vessels: "7-10 vessels", price: "£300", period: "per month" },
        ],
        features: [
          "Everything in Essentials, plus:",
          "Drill planning & management",
          "Incident reporting",
          "Hours of Rest tracking",
          "Training matrix",
          "Maintenance forecasting",
          "Custom forms & checklists",
          "Priority support",
        ],
        cta: "Join Waitlist",
        highlight: false,
      },
      {
        name: "Enterprise",
        tagline: "Coming 2028",
        description: "For merchant vessels and 10+ vessel fleets",
        vesselPricing: [
          { vessels: "1-10 vessels", price: "£400", period: "per month" },
          { vessels: "11-25 vessels", price: "£800", period: "per month" },
          { vessels: "26-50 vessels", price: "£1,200", period: "per month" },
          { vessels: "50+ vessels", price: "Custom", period: "pricing" },
        ],
        features: [
          "Everything in Professional, plus:",
          "ISM audit preparation",
          "Advanced analytics & reporting",
          "API access",
          "White-label options",
          "Dedicated account manager",
          "Custom integrations",
          "24/7 phone support",
        ],
        cta: "Join Waitlist",
        highlight: false,
      },
    ],
    earlyBird: "🎁 Beta waitlist members get 50% off Essentials tier first year",
    guarantee: "Cancel anytime. No long-term contracts.",
  },

  howItWorks: {
    eyebrow: "Simple Setup",
    title: "From Signup to Compliance in 30 Minutes",
    subtitle: "We've made it fast and easy to get started. Answer a few questions, and the app configures itself.",
    steps: [
      {
        number: "1",
        title: "Sign Up & Choose Your Vessel Type",
        description: "Tell us about your vessel: workboat, commercial, offshore support, etc. This determines which templates load automatically.",
        timeline: "2 minutes",
      },
      {
        number: "2",
        title: "App Auto-Configures Your SMS",
        description: "Based on your answers, the app pre-loads relevant maintenance items, checklists, procedures, and compliance requirements.",
        timeline: "Instant",
      },
      {
        number: "3",
        title: "Customize (Optional)",
        description: "Edit templates to match your operations. Add custom checklists, adjust maintenance schedules, or leave it as-is.",
        timeline: "As needed",
      },
      {
        number: "4",
        title: "Start Using It at Sea",
        description: "Download mobile apps, add crew, log maintenance, schedule drills. Works 100% offline. Syncs when you're back in port.",
        timeline: "Ongoing",
      },
    ],
    cta: "Join Beta Waitlist",
  },

  testimonials: {
    eyebrow: "Trusted by Maritime Operators",
    title: "What Captains and Fleet Managers Say",
    items: [
      {
        quote: "Finally, an SMS platform that works offline. We operate in remote areas with no internet, and SeaReady just works. Game-changer.",
        author: "Fleet Manager",
        company: "Survey Vessel Operator",
        location: "Aberdeen, UK",
      },
      {
        quote: "We tried other SMS software, but they were all designed for office workers, not mariners. SeaReady gets it — built by people who've actually been at sea.",
        author: "Master Mariner",
        company: "Offshore Support Vessel",
        location: "Great Yarmouth, UK",
      },
      {
        quote: "The customization is brilliant. We have company-specific checklists that SeaReady built into our app. It's like having bespoke software at SaaS prices.",
        author: "Operations Director",
        company: "CTV Fleet",
        location: "Grimsby, UK",
      },
    ],
  },

  faq: {
    eyebrow: "Common Questions",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "When will the SeaReady App launch?",
        answer: "Beta launching Q1 2026. Join the waitlist to get early access and 50% off your first year.",
      },
      {
        question: "Does it work offline?",
        answer: "Yes! The SeaReady App is built offline-first. You can complete all tasks without internet. Data syncs automatically when you reconnect.",
      },
      {
        question: "Can I customize the templates myself?",
        answer: "Absolutely. Self-service customization is included in the Essentials tier (£30-150/mo depending on fleet size). Edit checklists, procedures, maintenance schedules — anything you need. If you want professional help, we offer setup services as an optional add-on.",
      },
      {
        question: "What regulations does it support?",
        answer: "Pre-configured for UK Workboat Code (WBC3). Adaptable to ISM Code, MLC, or your company's specific requirements. We can customize the app to match any regulatory framework.",
      },
      {
        question: "Is this only for workboats?",
        answer: "No! While we have deep expertise in UK Workboat Code, the SeaReady App works for any maritime operation: commercial vessels, offshore support, survey vessels, dive support, fishing vessels, and more.",
      },
      {
        question: "How much does it cost?",
        answer: "Essentials tier (launching Q1 2026): £30-150/month based on fleet size (1 vessel = £30, 2-3 = £60, 4-6 = £100, 7-10 = £150). Professional (£100-300/mo) and Enterprise (£400-1,200/mo) tiers coming 2027-2028. No hidden fees, no per-user charges. Waitlist members get 50% off Essentials tier first year.",
      },
      {
        question: "Can you build custom features for us?",
        answer: "Yes, on a case-by-case basis. We offer bespoke feature development for specialized workflows or industry-specific needs. Contact us to discuss your requirements.",
      },
      {
        question: "What platforms does it support?",
        answer: "iOS, Android, and Web apps. Use it on your phone, tablet, or desktop. All platforms work offline and sync automatically.",
      },
      {
        question: "Do you offer professional setup services?",
        answer: "Yes! If you prefer a done-for-you approach, we can configure the app for your vessel, operations, and regulatory requirements. Contact us for a custom quote.",
      },
    ],
  },

  finalCta: {
    eyebrow: "Ready to Go Digital?",
    title: "Join the Beta Waitlist",
    subtitle: "Get 50% off your first year and early access to the SeaReady App when it launches in Q1 2026.",
    benefits: [
      "50% off Essentials tier first year (save £180-900)",
      "Early access to beta",
      "Influence product roadmap",
      "Priority support",
    ],
    cta: "Join Waitlist Now",
    secondaryCta: "Request Professional Setup Quote",
    note: "Need compliance NOW? Get our consultancy service (from £1,500) to build your SMS today → Transition to the digital app when it launches.",
  },

  meta: {
    title: "Digital SMS Management for Maritime Operations | SeaReady App",
    description: "Offline-first SMS platform for maritime operators. Track crew certifications, manage maintenance, schedule drills, and stay compliant. Pre-configured for WBC3, adaptable to ISM Code & MLC. From £30/month.",
    keywords: "maritime SMS software, digital safety management system, offshore compliance app, crew certification tracking, marine maintenance software, ISM Code software, MLC compliance, workboat management",
  },
};

export type AppContent = typeof appContent;
