# Email Capture System - Live & Working! ✅

**Updated:** 2026-04-19
**Status:** PRODUCTION READY

---

## ✅ What's Now Working

1. **Environment Variable Added:** `SUPABASE_SERVICE_ROLE_KEY` is now in Vercel production
2. **Redeployed:** New deployment includes the service role key
3. **API Endpoint:** `/api/collect-email` can now write to Supabase
4. **WBC3 Equipment Checker:** Email gate is active and capturing emails

---

## 🔍 How to View Captured Emails

### Method 1: Supabase Dashboard (Easiest)

1. **Login to Supabase:**
   - Go to: https://supabase.com/dashboard
   - Project: `jabcqjgrzlizmwjrqapc`

2. **View Leads Table:**
   - Click "Table Editor" in left sidebar
   - Select `leads` table
   - You'll see all captured emails with:
     - Email address
     - Signup source (which tool)
     - Created date
     - Lead score

3. **Filter by Source:**
   ```sql
   SELECT * FROM leads WHERE signup_source = 'wbc3-checker' ORDER BY created_at DESC;
   ```

### Method 2: Export to CSV

In Supabase SQL Editor, run:

```sql
COPY (
  SELECT
    email,
    signup_source,
    created_at,
    lead_score,
    tool_uses_count
  FROM public.leads
  ORDER BY created_at DESC
) TO STDOUT WITH CSV HEADER;
```

---

## 🧪 Test Email Capture

### Test on Live Site

1. **Clear your localStorage:**
   - Open browser DevTools (F12)
   - Console tab
   - Run: `localStorage.removeItem('fleetskipper_user_email')`

2. **Visit the tool:**
   - Go to: https://fleetskipper.com/tools/wbc3-checker

3. **You should see:**
   - Email popup modal appears
   - Enter your test email
   - Click "Access Tools"
   - Modal closes and tool loads

4. **Verify in Supabase:**
   - Go to Table Editor → `leads`
   - Your test email should appear
   - Source should be: `wbc3-checker`

---

## 📊 Current Setup

### Tools with Email Gate:
- ✅ **WBC3 Equipment Checker** - WORKING
- ❌ **WBC3 Crew Checker** - NOT YET ADDED
- ❌ **FV Crew Checker** - NOT YET ADDED

### Database Schema:

```sql
public.leads table:
- id (UUID)
- email (TEXT, UNIQUE)
- signup_source (TEXT) -- 'wbc3-checker' | 'crew-checker' | 'fv-crew-checker'
- lead_score (TEXT) -- 'hot' | 'warm' | 'cold'
- created_at (TIMESTAMP)
- last_activity_at (TIMESTAMP)
- tool_uses_count (INTEGER)
- full_name (TEXT) -- optional
- company_name (TEXT) -- optional
- vessel_type (TEXT) -- optional
```

---

## 🚀 Next Steps (Optional)

### 1. Add Email Gate to Other Tools

To add email gate to crew-checker:

```tsx
// In src/app/tools/crew-checker/page.tsx
import { EmailGate } from '@/components/EmailGate'

// Add state
const [hasAccess, setHasAccess] = useState(false)

// Add handler
const handleEmailSubmitted = (email: string) => {
  setHasAccess(true)
  setUserEmail(email)
}

// Add to JSX before form
{!hasAccess && (
  <EmailGate
    onEmailSubmitted={handleEmailSubmitted}
    title="Access WBC3 Crew Checker"
    description="Enter your email to use our free WBC3 compliance tools."
  />
)}
```

### 2. Email Notifications

Get notified when new leads come in:

```typescript
// In /api/collect-email/route.ts
// Add after successful insert:

await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'FleetSkipper <noreply@fleetskipper.com>',
    to: 'jonathan@fleetskipper.com',
    subject: `New lead: ${email} from ${source}`,
    html: `<p>New lead captured from ${source}</p><p>Email: ${email}</p>`
  })
})
```

### 3. Export Leads Regularly

Set up a weekly export script or use Supabase webhooks to send leads to your CRM.

---

## 🔧 Troubleshooting

### Emails not appearing in Supabase?

1. **Check table exists:**
   ```sql
   SELECT * FROM public.leads LIMIT 1;
   ```

2. **If table doesn't exist, run migration:**
   - Open Supabase SQL Editor
   - Copy contents of `supabase-leads-table.sql`
   - Run it

3. **Check API logs in Vercel:**
   - Vercel Dashboard → Project → Functions
   - Find `/api/collect-email`
   - Check logs for errors

### "Failed to save email" error?

- Check environment variables in Vercel:
  ```bash
  vercel env ls
  ```
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is present

### Modal not appearing?

- Clear localStorage: `localStorage.removeItem('fleetskipper_user_email')`
- Hard refresh page: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

---

## 📈 Analytics

Track lead conversion:

```sql
-- Total leads
SELECT COUNT(*) FROM leads;

-- Leads by source
SELECT signup_source, COUNT(*)
FROM leads
GROUP BY signup_source
ORDER BY COUNT(*) DESC;

-- Leads this week
SELECT COUNT(*)
FROM leads
WHERE created_at > NOW() - INTERVAL '7 days';

-- Hot leads
SELECT email, signup_source, created_at
FROM leads
WHERE lead_score = 'hot'
ORDER BY created_at DESC;
```

---

## ✅ Summary

**What's Working:**
- ✅ Email gate modal on WBC3 Equipment Checker
- ✅ Emails saved to Supabase `leads` table
- ✅ localStorage prevents repeated popups
- ✅ Service role key configured in production
- ✅ API endpoint `/api/collect-email` working

**What You Can Do Now:**
1. View captured emails in Supabase dashboard
2. Export leads to CSV anytime
3. Track which tools are generating leads
4. Build email nurture campaigns from leads list

**Supabase Dashboard:**
https://supabase.com/dashboard/project/jabcqjgrzlizmwjrqapc/editor

---

**Status:** 🟢 LIVE & CAPTURING EMAILS
