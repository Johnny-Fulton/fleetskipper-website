# Calendly Integration Setup Guide

## ✅ What's Already Done

The FleetSkipper website now has a working Calendly booking widget integrated into the Contact page (`/contact`).

**Current Integration:**
- **Package**: `react-calendly` (v4.x)
- **Location**: `/contact` page, "Book Free Consultation" section
- **Widget Type**: InlineWidget (embedded directly in the page)
- **Styling**: Cyan theme matching FleetSkipper branding

---

## 🔧 How to Update Your Calendly URL

Right now, the widget is using a **demo URL**: `https://calendly.com/fleetskipper/15min`

To connect YOUR actual Calendly account:

### Step 1: Create Your Calendly Account

1. Go to [calendly.com](https://calendly.com) and sign up (free plan is fine)
2. Create an event type for "15-Minute Consultation" or "Free WBC3 Consultation"
3. Set your availability (e.g., Monday-Friday, 9am-5pm GMT)
4. Add questions for visitors (vessel type, compliance needs, etc.)

### Step 2: Get Your Calendly URL

Once you've created an event, you'll get a URL like:
```
https://calendly.com/your-username/event-name
```

Example:
```
https://calendly.com/jonathan-fleetskipper/wbc3-consultation
```

### Step 3: Update the Website Code

Open this file:
```
/src/app/contact/page.tsx
```

Find this section (around line 72):
```tsx
<InlineWidget
  url="https://calendly.com/fleetskipper/15min"  // ← Change this
  styles={{
    height: '700px',
    minWidth: '320px',
  }}
  pageSettings={{
    backgroundColor: 'ffffff',
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: '06b6d4',
    textColor: '1e293b',
  }}
/>
```

Replace the `url` with YOUR Calendly URL:
```tsx
url="https://calendly.com/your-actual-username/your-event-name"
```

Save the file, and the widget will automatically update!

---

## 🎨 Customization Options

### Change Widget Height
```tsx
styles={{
  height: '800px', // Make it taller
  minWidth: '320px',
}}
```

### Change Colors
```tsx
pageSettings={{
  backgroundColor: 'ffffff', // White background
  primaryColor: '06b6d4',    // Cyan (FleetSkipper brand color)
  textColor: '1e293b',       // Dark slate text
}}
```

### Hide Event Details
```tsx
pageSettings={{
  hideEventTypeDetails: true,  // Hide event title/description
  hideLandingPageDetails: true, // Hide your profile info
}}
```

---

## 📍 Where It Appears

The Calendly widget is visible on:

1. **Contact Page**: `yourdomain.com/contact`
2. **Direct Link**: Footer "Book Consultation" button → `/contact#book-consultation`

When users click "Book Consultation" in the footer, they'll jump directly to the Calendly widget.

---

## 🧪 Testing

### Test Locally (Localhost)
1. Make sure dev server is running: `npm run dev`
2. Go to: `http://localhost:3002/contact`
3. Scroll down to "Book Free Consultation"
4. You should see the Calendly widget embedded

### Test Live (After Deployment)
1. Go to: `fleetskipper.com/contact` (or your live domain)
2. Verify the widget loads and shows your availability
3. Try booking a test appointment to ensure email confirmations work

---

## 🚀 Deployment Notes

The Calendly integration works on Vercel with **no extra configuration needed**. Just push to GitHub and it'll deploy automatically.

**Important**: Make sure you've updated the Calendly URL to YOUR account BEFORE deploying to production!

---

## 📧 Email Notifications

Calendly will send automatic emails to:
- **You**: When someone books an appointment
- **Customer**: Confirmation + calendar invite + reminder emails

You can customize these emails in your Calendly dashboard under:
**Settings → Notifications & Workflows**

---

## 🔒 Privacy & GDPR

Calendly is GDPR-compliant. When visitors book:
- Their email/name is stored in Calendly (not your website database)
- They receive privacy notices from Calendly
- You can add a note on your Contact page about data handling

---

## 💡 Pro Tips

1. **Add Pre-Qualification Questions**: In Calendly, add custom questions like:
   - "What type of vessel do you operate?"
   - "Do you currently have an SMS?"
   - "What's your main compliance challenge?"

2. **Set Buffer Times**: Prevent back-to-back meetings by adding 5-10 min buffers

3. **Use Meeting Confirmation Page**: Redirect visitors to a "Thank You" page after booking

4. **Track Conversions**: In Calendly, enable Google Analytics tracking to see how many people book from your website

---

## 🆘 Troubleshooting

### Widget Not Loading
- Check your internet connection
- Verify the Calendly URL is correct (no typos)
- Check browser console for errors (F12 → Console tab)

### Wrong Availability Showing
- Update your timezone in Calendly settings
- Check your Google Calendar integration is working
- Verify your event type availability rules

### Bookings Not Appearing in Calendar
- Re-connect your calendar in Calendly (Settings → Integrations)
- Check calendar permissions (allow Calendly to write events)

---

## 📝 Current Implementation Details

**File**: `/src/app/contact/page.tsx`
**Component**: `<InlineWidget>` from `react-calendly`
**Package Version**: `^4.3.1` (check `package.json` for exact version)
**Styling**: Custom cyan/slate colors matching FleetSkipper brand

---

## ✅ Next Steps

1. Create your Calendly account at [calendly.com](https://calendly.com)
2. Set up a "15-Minute WBC3 Consultation" event
3. Copy your Calendly URL
4. Update `/src/app/contact/page.tsx` with your URL
5. Test on localhost
6. Deploy to production

---

**Need Help?** Contact the FleetSkipper dev team or check [Calendly's documentation](https://help.calendly.com/)
