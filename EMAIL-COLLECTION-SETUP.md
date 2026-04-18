# Email Collection System - Setup Guide

## ✅ What Was Done

1. **Created API Endpoint**: `/api/collect-email/route.ts`
   - Saves emails to Supabase `leads` table
   - Validates email format
   - Prevents duplicates
   - Tracks source (wbc3-checker, crew-checker, etc.)

2. **Updated EmailGate Component**: Enabled the backend API call

3. **Created Database Migration**: `supabase-leads-table.sql`

4. **Created Test Script**: `test-email-collection.js`

---

## 🚀 Setup Steps (Do These Now)

### Step 1: Run Supabase Migration

1. Open Supabase SQL Editor:
   - Go to: https://supabase.com/dashboard/project/dvgxcsqhbhstsadcuinj/sql/new

2. Copy and run the contents of: `supabase-leads-table.sql`

3. Verify the table was created:
   ```sql
   SELECT * FROM public.leads LIMIT 1;
   ```

### Step 2: Add Environment Variable

The API needs the Supabase service role key to insert leads.

1. Get your service role key from:
   - Supabase Dashboard > Settings > API > `service_role` key (secret)

2. Add to `.env.local`:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

3. Restart the dev server:
   ```bash
   npm run dev
   ```

### Step 3: Test Locally

Run the test script:
```bash
node test-email-collection.js
```

You should see:
- ✅ API endpoint working
- ✅ Email validation working
- ✅ Duplicate detection working

### Step 4: Test in Browser

1. Clear localStorage:
   ```js
   localStorage.removeItem('fleetskipper_user_email')
   ```

2. Visit: http://localhost:3002/tools/wbc3-checker

3. Enter a test email in the popup

4. Check Supabase for the lead:
   ```sql
   SELECT * FROM public.leads ORDER BY created_at DESC LIMIT 10;
   ```

### Step 5: Deploy to Production

1. Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables:
   - Vercel Dashboard > Settings > Environment Variables
   - Add as "Secret"

2. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Add email collection system with Supabase"
   git push
   ```

3. Vercel will auto-deploy

---

## 📊 Viewing Collected Leads

### In Supabase Dashboard

1. Go to: Table Editor > `leads`
2. You'll see all collected emails with:
   - Email address
   - Signup source (which tool they used)
   - Created date
   - Lead score

### Export to CSV

```sql
COPY (
  SELECT email, signup_source, created_at, lead_score
  FROM public.leads
  ORDER BY created_at DESC
) TO STDOUT WITH CSV HEADER;
```

---

## 🎯 What Happens Now

When someone uses the WBC3 Checker:

1. **Email popup appears** (if they haven't provided email before)
2. **They enter email** → saved to localStorage
3. **API call sends email** to `/api/collect-email`
4. **Email saved to Supabase** `leads` table with:
   - email: `user@example.com`
   - signup_source: `wbc3-checker`
   - lead_score: `warm`
   - created_at: timestamp

5. **You can view/export** anytime from Supabase dashboard

---

## 🔧 Troubleshooting

### "Failed to save email" error

- Check Supabase migration ran successfully
- Verify `SUPABASE_SERVICE_ROLE_KEY` is in `.env.local`
- Restart dev server after adding env var

### Emails not appearing in Supabase

- Check browser console for API errors
- Run test script to verify API works
- Check Supabase logs: Dashboard > Logs

### Duplicate emails

- This is expected behavior
- Second submission updates `last_activity_at`
- You can count tool uses with `tool_uses_count`

---

## 📈 Next Steps (Optional Enhancements)

1. **Email yourself when leads come in**:
   - Add Resend/SendGrid to API
   - Send notification email on new lead

2. **Add to crew-checker and fv-crew-checker**:
   - Import and use EmailGate component
   - Change source to `crew-checker` or `fv-crew-checker`

3. **Collect more data**:
   - Add vessel_type, company_name fields to EmailGate
   - Store in leads table

4. **CRM integration**:
   - Export to Mailchimp, HubSpot, etc.
   - Or build simple admin panel to view leads

---

## 🎉 Summary

**Before**: Emails saved only in browser localStorage (lost forever)

**After**: Every email saved to Supabase database, exportable anytime, with source tracking and duplicate prevention

You now have a proper lead collection system!
