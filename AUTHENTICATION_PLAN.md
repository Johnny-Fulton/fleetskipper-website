# FleetSkipper Authentication & Marketing Pipeline Plan

**Created:** 2025-01-XX
**Purpose:** Implement user authentication and capture marketing data for FleetSkipper free tools

---

## GOAL

Gate the WBC3 Equipment Checker and Crew Requirements tools behind user authentication, capturing valuable marketing data (name, email, company, vessel details) for lead generation and email marketing campaigns.

---

## RECOMMENDED TECH STACK

### Option 1: **Clerk** (RECOMMENDED - Easiest)
- **Pros**: Drop-in authentication, beautiful UI, easy Next.js integration, free tier (10,000 MAU)
- **Cons**: Paid after free tier
- **Website**: https://clerk.com
- **Effort**: Low (2-3 hours)

### Option 2: **NextAuth.js** (More Control)
- **Pros**: Free, full control, integrates with any database
- **Cons**: More setup required, need to build UI
- **Website**: https://next-auth.js.org
- **Effort**: Medium (1 day)

### Option 3: **Supabase Auth**
- **Pros**: Free tier, includes database, real-time subscriptions, built-in email
- **Cons**: Learning curve if new to Supabase
- **Website**: https://supabase.com
- **Effort**: Medium (4-6 hours)

**RECOMMENDATION: Start with Clerk for fastest implementation**

---

## IMPLEMENTATION PHASES

### Phase 1: Add Authentication (Week 1)

#### Step 1.1: Install Clerk
```bash
cd /Users/jonathanfulton/REGULATION\ APP/FleetSkipper/website
npm install @clerk/nextjs
```

#### Step 1.2: Set up Clerk account
1. Sign up at https://clerk.com
2. Create a new application
3. Copy API keys to `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

#### Step 1.3: Wrap app with ClerkProvider
Update `src/app/layout.tsx`:
```tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

#### Step 1.4: Create middleware to protect routes
Create `middleware.ts` in root:
```typescript
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/contact",
    "/about",
    "/pricing"
  ],
  // Tools require authentication
  ignoredRoutes: []
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

#### Step 1.5: Add sign-in/sign-up pages
Create `src/app/sign-in/[[...sign-in]]/page.tsx`:
```tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl"
          }
        }}
        routing="path"
        path="/sign-in"
        redirectUrl="/tools"
      />
    </div>
  );
}
```

Create `src/app/sign-up/[[...sign-up]]/page.tsx`:
```tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl"
          }
        }}
        routing="path"
        path="/sign-up"
        redirectUrl="/tools"
      />
    </div>
  );
}
```

#### Step 1.6: Update navigation to show user menu
Update `src/components/NavBar.tsx` to add user button:
```tsx
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

export default function NavBar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav>
      {/* existing nav items */}

      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            <span className="text-sm text-gray-700">
              {user.firstName || user.emailAddresses[0].emailAddress}
            </span>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}
```

---

### Phase 2: Capture Marketing Data (Week 1-2)

#### Step 2.1: Customize Clerk signup form
In Clerk Dashboard > User & Authentication > Email, Phone, Username:
- Enable email (required)
- Add custom fields:
  - `first_name` (required)
  - `last_name` (required)
  - `company_name` (optional)
  - `job_title` (optional)
  - `phone_number` (optional)

#### Step 2.2: Create onboarding flow
Create `src/app/onboarding/page.tsx`:
```tsx
'use client'

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    vesselType: '',
    numberOfVessels: '',
    phoneNumber: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update Clerk user metadata
    await user.update({
      unsafeMetadata: {
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        vesselType: formData.vesselType,
        numberOfVessels: formData.numberOfVessels,
        phoneNumber: formData.phoneNumber,
        onboardingComplete: true
      }
    });

    // Send to your CRM/marketing platform
    await fetch('/api/crm/add-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        ...formData
      })
    });

    // Redirect to tools
    router.push('/tools');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to FleetSkipper!
        </h1>
        <p className="text-gray-600 mb-8">
          Tell us a bit about yourself to get started
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              placeholder="Your maritime company"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              required
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              placeholder="e.g., Fleet Manager, Master, Operations Director"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type of Vessels You Operate
            </label>
            <select
              required
              value={formData.vesselType}
              onChange={(e) => setFormData({ ...formData, vesselType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            >
              <option value="">Select vessel type</option>
              <option value="workboat">Workboats</option>
              <option value="pilot">Pilot Boats</option>
              <option value="crew_transfer">Crew Transfer Vessels</option>
              <option value="dive">Dive Support Vessels</option>
              <option value="survey">Survey Vessels</option>
              <option value="tug">Tugs</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Vessels in Fleet
            </label>
            <select
              required
              value={formData.numberOfVessels}
              onChange={(e) => setFormData({ ...formData, numberOfVessels: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="1">1 vessel</option>
              <option value="2-5">2-5 vessels</option>
              <option value="6-10">6-10 vessels</option>
              <option value="11-20">11-20 vessels</option>
              <option value="20+">20+ vessels</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              placeholder="+44 123 456 7890"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
          >
            Continue to Tools →
          </button>
        </form>
      </div>
    </div>
  );
}
```

#### Step 2.3: Redirect new users to onboarding
Update sign-up redirect:
```tsx
<SignUp
  redirectUrl="/onboarding"
/>
```

---

### Phase 3: CRM Integration (Week 2)

#### Option A: **Mailchimp** (Email Marketing Focus)
```typescript
// src/app/api/crm/add-lead/route.ts
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: data.email,
        status: "subscribed",
        merge_fields: {
          FNAME: data.firstName,
          LNAME: data.lastName,
          COMPANY: data.companyName,
          JOBTITLE: data.jobTitle,
          VESSELS: data.numberOfVessels,
        },
        tags: ["free-tools-user", "wbc3-checker"]
      }
    );

    return Response.json({ success: true, response });
  } catch (error) {
    console.error('Mailchimp error:', error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
```

#### Option B: **HubSpot** (Full CRM)
```typescript
// src/app/api/crm/add-lead/route.ts
const hubspot = require('@hubspot/api-client');

export async function POST(request: Request) {
  const data = await request.json();

  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN
  });

  try {
    const contactObj = {
      properties: {
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName,
        company: data.companyName,
        jobtitle: data.jobTitle,
        phone: data.phoneNumber,
        vessel_type: data.vesselType,
        number_of_vessels: data.numberOfVessels,
        lead_source: "Free WBC3 Tools",
        lifecyclestage: "lead"
      }
    };

    const response = await hubspotClient.crm.contacts.basicApi.create(contactObj);

    return Response.json({ success: true, response });
  } catch (error) {
    console.error('HubSpot error:', error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
```

#### Option C: **Google Sheets** (Simple/Free Start)
```typescript
// src/app/api/crm/add-lead/route.ts
import { google } from 'googleapis';

export async function POST(request: Request) {
  const data = await request.json();

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const row = [
    new Date().toISOString(),
    data.email,
    data.firstName,
    data.lastName,
    data.companyName,
    data.jobTitle,
    data.vesselType,
    data.numberOfVessels,
    data.phoneNumber
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Leads!A:I',
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Google Sheets error:', error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
```

---

### Phase 4: Track User Behavior (Week 2-3)

#### Step 4.1: Track tool usage
```typescript
// src/app/api/analytics/track/route.ts
export async function POST(request: Request) {
  const { userId, event, properties } = await request.json();

  // Log to your analytics platform
  // Examples: Mixpanel, Amplitude, PostHog, or simple database

  await db.events.create({
    data: {
      userId,
      event, // e.g., "wbc3_check_completed", "crew_requirements_viewed"
      properties: {
        ...properties,
        timestamp: new Date()
      }
    }
  });

  return Response.json({ success: true });
}
```

#### Step 4.2: Track in WBC3 tool
Update `src/app/tools/wbc3-checker/page.tsx`:
```tsx
const handleSubmit = async (e) => {
  // ... existing form submission

  // Track this usage
  await fetch('/api/analytics/track', {
    method: 'POST',
    body: JSON.stringify({
      userId: user.id,
      event: 'wbc3_check_started',
      properties: {
        vesselType: formData.vesselType,
        category: formData.category,
        lengthOverall: formData.lengthOverall
      }
    })
  });
};
```

---

### Phase 5: Email Marketing Automation (Week 3-4)

#### Automated Email Sequences

**Welcome Series:**
1. **Day 0** (Immediately after signup): Welcome email + link to tools
2. **Day 2**: Tutorial video on using WBC3 checker
3. **Day 5**: Case study of customer using FleetSkipper
4. **Day 7**: Invitation to book a demo of full platform

**Re-engagement:**
- If user hasn't used tools in 14 days: "Missing something? Here's how FleetSkipper can help"
- If user has used tools 3+ times: "Ready to upgrade? Here's what FleetSkipper Pro offers"

**Segmentation:**
- By fleet size (1 vessel vs 20+ vessels = different pitch)
- By vessel type (pilot boats vs workboats = different features to highlight)
- By job title (fleet managers vs masters = different pain points)

---

## MARKETING DATA YOU'LL CAPTURE

### Signup Data:
- ✅ Email address
- ✅ First name / Last name
- ✅ Company name
- ✅ Job title
- ✅ Phone number
- ✅ Vessel type
- ✅ Fleet size

### Usage Data:
- ✅ Which tools they use (WBC3 vs Crew Requirements)
- ✅ How often they use them
- ✅ Vessel configurations they check
- ✅ Time spent in tools
- ✅ Results they save/export

### Marketing Signals:
- 🔥 **Hot Lead**: Used tools 5+ times in first week
- ⚡ **Warm Lead**: Completed onboarding, used tools 1-2 times
- ❄️ **Cold Lead**: Signed up but never used tools
- 🎯 **High Value**: Fleet size 10+ vessels
- 💎 **Premium Target**: Job title contains "Director", "Manager", "Owner"

---

## GDPR COMPLIANCE CHECKLIST

- [ ] Add cookie consent banner (use react-cookie-consent)
- [ ] Create Privacy Policy page
- [ ] Add Terms of Service page
- [ ] Include checkbox on signup: "I agree to receive marketing emails"
- [ ] Provide unsubscribe link in all emails
- [ ] Allow users to export their data
- [ ] Allow users to delete their account
- [ ] Store consent records in database

---

## COST BREAKDOWN

### Free Tier (Good for testing):
- Clerk: 10,000 monthly active users free
- Google Sheets: Free
- Mailchimp: 500 contacts free
- Vercel: Free hosting

### Paid (Once you scale):
- Clerk Pro: $25/month (unlimited users)
- Mailchimp Essentials: ~£10/month (500-2,500 contacts)
- HubSpot Starter: £15/month
- Supabase Pro: $25/month (database + auth + storage)

**Total startup cost: £0 - £50/month depending on choices**

---

## IMPLEMENTATION TIMELINE

**Week 1:**
- Install and configure Clerk
- Add sign-in/sign-up pages
- Protect /tools routes
- Test authentication flow

**Week 2:**
- Build onboarding form
- Set up CRM integration (start with Google Sheets)
- Capture user data on signup
- Test data flow to CRM

**Week 3:**
- Add usage tracking
- Set up email marketing platform
- Create welcome email sequence
- Test automated emails

**Week 4:**
- Add GDPR compliance elements
- Create privacy policy
- Test full user journey
- Launch! 🚀

---

## NEXT STEPS

1. **Choose your auth provider** (Clerk recommended)
2. **Choose your CRM** (Mailchimp or Google Sheets to start)
3. **Install dependencies**
4. **Follow Phase 1 implementation**

Let me know which option you want to go with and I'll help you implement it!
