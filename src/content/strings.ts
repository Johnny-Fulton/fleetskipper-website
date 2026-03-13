// content/strings.ts
export const copy = {
  nav: {
    links: ["Services", "Resources", "Pricing", "About"],
    cta: "Request Quote",
    login: "Log in",
  },
  hero: {
    h1: "Maritime Compliance Solutions Built by Mariners",
    sub: "From bespoke SMS builds to digital compliance management. We handle maritime compliance so you can focus on operations.",
    credibility: "SMS Portal available now. Operations app launching Q2 2026.",
    ctaPrimary: "Get Started",
    ctaSecondary: "View Pricing",
    badges: ["Built by Mariners", "MCA-Compliant", "Fast Turnaround", "WBC3 & ISM Code"],
  },
  credibility: {
    title: "Built around the UK Workboat Code Ed.3",
    logos: ["WBC3 Aligned", "Works Offline", "Plain English", "No Consultants", "30 Min Setup", "Built by Mariners"],
  },
  problemSolution: {
    problem: {
      title: "Maritime compliance shouldn&apos;t be this hard",
      bullets: [
        "Hours spent on paperwork instead of operations",
        "Scrambling for documents during inspections", 
        "Generic templates that don't fit your vessel",
      ],
    },
    solution: {
      title: "SafeDeck fixes this",
      bullets: [
        "Pre-configured defaults for your vessel type",
        "Works completely offline when at sea",
        "Everything inspectors need, ready instantly",
      ],
    },
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "Ready-to-use Safety Management System in 30 minutes",
    sub: "No consultants. No waiting. Just answer a few questions and your SMS is ready to use.",
    steps: [
      {
        number: '1',
        title: "Tell us about your vessels",
        description: "Setup wizard asks for vessel type, where you operate, and crew size. Takes 5 minutes.",
        features: ['Works for any vessel type', 'Multiple vessels supported', 'Choose WBC3 or IWC'],
      },
      {
        number: '2',
        title: "We build your SMS",
        description: "The right procedures, maintenance checks, and drill plans for your vessel. No generic templates.",
        features: ['100+ preloaded maintenance checks', 'Drill schedules included', 'All documents prepared'],
      },
      {
        number: '3',
        title: "Add your crew",
        description: "Send email invites. Each person gets their own login and sees only what they need.",
        features: ['Simple invites', 'Roles and permissions set', 'Works on any device'],
      },
      {
        number: '4',
        title: "Start using it",
        description: "Begin logging drills, defects, and maintenance right away. Everything syncs when you're back online.",
        features: ['Start immediately', 'Automatic reminders', 'Ready for inspections'],
      },
    ],
    cta: "See it in action",
    footer: "Join hundreds of UK vessels already using SafeDeck",
  },
  features: {
    eyebrow: "Key Features",
    title: "Everything you need for vessel compliance",
    items: [
      {
        eyebrow: "Compliance",
        title: "Smart Compliance Engine",
        description: "Pre-configured for UK Workboat Code with automatic updates when regulations change.",
      },
      {
        eyebrow: "Crew",
        title: "Crew & Certificates",
        description: "Track qualifications, medical certificates, and training with automatic expiry alerts.",
      },
      {
        eyebrow: "Maintenance",
        title: "Maintenance Scheduling",
        description: "Schedule and track maintenance tasks with UK requirements and recommendations built-in.",
      },
      {
        eyebrow: "Safety",
        title: "Drills & Incidents",
        description: "Log safety drills and incidents with WBC3-compliant templates and reporting.",
      },
      {
        eyebrow: "Operations",
        title: "Hours of Rest",
        description: "Automatic compliance tracking for crew working time regulations and rest periods.",
      },
      {
        eyebrow: "Reporting",
        title: "One-Click Reports",
        description: "Generate inspection-ready reports instantly. Everything inspectors need in seconds.",
      },
      {
        eyebrow: "Offline",
        title: "Works at Sea",
        description: "Full functionality when offline. Data syncs automatically when you're back in range.",
      },
      {
        eyebrow: "Setup",
        title: "30-Minute Setup",
        description: "Answer a few questions and your SMS is ready. No consultants or lengthy onboarding.",
      },
    ],
  },
  dashboard: {
    title: "See everything at a glance",
    sub: "Your complete SMS dashboard — operations, crew, drills, maintenance, and incidents all in one place.",
    features: [
      "One-click inspection reports",
      "Hours of Rest compliance checks", 
      "Works completely offline",
    ],
  },
  compliance: {
    eyebrow: "Compliance Built In",
    title: "Pass your next inspection with confidence",
    sub: "Pre-configured for WBC3 and IWC. Everything inspectors want to see, ready when they arrive.",
    cards: [
      { 
        title: "WBC3 & IWC Ready", 
        description: "Templates match current regulations. No guesswork." 
      },
      { 
        title: "Audit Trail Complete", 
        description: "Every action logged with timestamp and signature. Reports in one click." 
      },
      { 
        title: "Inspector Friendly", 
        description: "Clean, organised records inspectors can review quickly. No missing documents." 
      },
    ],
    cta: "Download WBC3 compliance checklist",
    ctaSub: "Free checklist showing all requirements for WBC3 compliance",
  },
  resourcesTeaser: {
    eyebrow: "Free Resources",
    title: "Expert Compliance Resources",
    sub: "Download practical tools and guides from maritime compliance specialists",
    items: [
      {
        title: "WBC3 Compliance Checklist",
        description: "Complete checklist covering all UK Workboat Code Edition 3 requirements for your vessel",
        type: "gated" as const,
        icon: "checklist",
        badge: "Most Popular",
      },
      {
        title: "MCA Audit Preparation Guide",
        description: "What surveyors look for and how to prepare your vessel and documentation for inspection",
        type: "gated" as const,
        icon: "guide",
        badge: "Essential",
      },
      {
        title: "SMS Procedure Sample",
        description: "Download a sample 2-page procedure to see our workboat-specific approach to compliance",
        type: "free" as const,
        icon: "template",
        badge: "Preview",
      },
    ],
    cta: "View All Resources",
  },
  blogTeaser: {
    eyebrow: "Latest Insights",
    title: "Maritime Insights",
    sub: "Expert guidance on UK workboat compliance, safety management, and MCA requirements",
    articles: [
      {
        title: "From Paper to Precision: Why Electronic Master Pilot Exchange is the New Standard",
        excerpt: "Electronic Master Pilot Exchange systems transform the critical vessel handover from static paper processes to dynamic, verified data exchange. Discover how SafeDeckOS | Pilot eliminates bridge distractions and enhances situational awareness.",
        category: "Port Innovation",
        date: "2025-01-26",
        readTime: "7 min read",
        image: "/images/blog/empx-card.jpg",
        href: "/blog/mpx-clipboard-to-digital",
      },
      {
        title: "Navigating Workboat Code 3: Your Essential Guide to the New Mandatory Safety Management System",
        excerpt: "The UK Workboat Code Edition 3 makes SMS mandatory for all certified vessels. Learn what this means for your operations and how to achieve compliance before the December 2026 deadline.",
        category: "Compliance",
        date: "2025-12-23",
        readTime: "10 min read",
        image: "/images/workboats/workboat-29-card.jpg",
        href: "/blog/workboat-code-3-sms-guide",
      },
    ],
    cta: "View All Articles",
    ctaHref: "/blog",
  },
  trust: {
    title: "Trusted by UK vessel operators for MCA-compliant SMS solutions",
  },
  finalCta: {
    eyebrow: "Get Started",
    title: "Ready to simplify maritime compliance?",
    sub: "Join UK vessel operators using SafeDeck for WBC3 and MCA-compliant SMS solutions.",
    cta: "Request Quote",
    tagline: "Maritime Compliance. Actually Simple.",
  },
  footer: {
    product: {
      heading: "Products",
      links: ["SafeDeckOS | Pilot™", "SafeDeckOS Suite™", "Consultancy"],
      urls: ["/products/empx", "/products/sms-suite", "/consultancy"],
    },
    resources: {
      heading: "Industries",
      links: ["Ports & Harbours", "Workboats", "Merchant Vessels"],
      urls: ["/solutions/pilot-organizations", "/solutions/workboats", "/solutions/merchant-vessels"],
    },
    company: {
      heading: "Company",
      links: ["About", "Contact", "Blog"],
      urls: ["/about", "/contact", "/blog"],
    },
    legal: {
      heading: "Legal",
      links: ["Terms of service", "Privacy policy", "Acceptable use", "SLA", "Support policy"],
      urls: ["/terms-of-service", "/privacy-policy", "/acceptable-use", "/sla", "/support-policy"],
    },
    copyright: "SafeDeck. All rights reserved.",
  },
  pricing: {
    title: "Simple pricing",
    sub: "No setup fees. Cancel any time.",
    plans: [
      {
        name: "Starter",
        description: "1 vessel. Core modules. Email support.",
        price: "Contact us",
        period: ""
      },
      {
        name: "Fleet",
        description: "Up to 10 vessels. Priority support. Bulk exports.",
        price: "Contact us",
        period: ""
      },
      {
        name: "Enterprise",
        description: "Unlimited vessels. SSO. Custom onboarding.",
        price: "Contact us",
        period: ""
      },
    ],
    faq: [
      ["Do we own our data?", "Yes. Export any time."],
      ["Does it work offline?", "Yes. Full offline, sync later."],
      ["Can we import old records?", "Yes. We'll help."],
      ["Phones/tablets?", "Yes. Optimised for mobile."],
    ],
  },
  meta: {
    title: "SafeDeck - Maritime Compliance Tools | MCA-Compliant SMS Solutions",
    description: "Maritime compliance tools built by mariners. Starting with WBC3-compliant SMS for UK workboats. Fast delivery, plain English, MCA inspection-ready.",
  },
  resources: {
    h1: "Resources",
    sub: "Useful downloads to help you get started. Placeholders now — full versions coming soon.",
    wbc3: {
      title: "WBC3 SMS Kick-off Checklist (PDF)",
      description: "A short, practical checklist for Workboat Code Ed.3. Placeholder version for now.",
      cta: "Get the checklist",
      note: "We'll email you the full edition automatically when it's ready.",
    },
    drillLog: {
      title: "Drill Log Template (Spreadsheet)",
      description: "Simple, inspector-friendly format. Placeholder today — final shortly.",
      cta: "Download template",
    },
    form: {
      name: "Your name",
      email: "Email address",
      company: "Company (optional)",
    },
  },
};

export type Copy = typeof copy;