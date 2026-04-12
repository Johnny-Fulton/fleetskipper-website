# Creating a Brand New Supabase Project for FleetSkipper Website

## Issue

The automated script was blocked by Multi-Factor Authentication (MFA) on your Supabase account.

## Manual Creation Steps

### 1. Open Supabase Dashboard
Navigate to: **https://supabase.com/dashboard/projects**

### 2. Log In
- Click **"Continue with GitHub"**
- Complete your MFA challenge
- You'll be redirected to the projects page

### 3. Create New Project
- Click **"New project"** button
- **Organization**: Choose your organization
- **Project name**: **`FleetSkipper Website`**
- **Database password**: **`FleetSkipper2025!WebAuth#Secure`** (save this!)
- **Region**: **Europe (London)** or closest UK region
- **Pricing plan**: Free tier is fine for development

### 4. Wait for Project Creation
- Takes 1-2 minutes
- Supabase will set up database, storage, and auth

### 5. Get Your Credentials

Once created, go to: **Project Settings → API**

Copy these values:

```
Project URL: https://[YOUR-PROJECT-ID].supabase.co
anon/public key: eyJhbG...  (long JWT token)
service_role key: eyJhbG...  (another long JWT token - secret!)
```

### 6. Update .env.local File

Replace the contents of `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
```

### 7. Run Database Migration

Once you have the new project credentials, run:

```bash
cd "/Users/jonathanfulton/REGULATION APP/FleetSkipper/website"
# Create a new migration script with your NEW project ID
# Then run the migration to create the user_profiles and tool_results tables
```

## Important Notes

- **DO NOT use the old project** (dvgxcsqhbhstsadcuinj) - create a completely fresh one
- **SAVE the database password** - you'll need it later
- **Keep the service_role key SECRET** - never commit to GitHub
- After project creation, you'll also need to:
  1. Enable Email authentication (Authentication → Providers → Enable Email)
  2. Turn OFF "Confirm email" for testing
  3. Run the database migration from `supabase-migrations.sql`

## Database Password (Don't Lose This!)

```
FleetSkipper2025!WebAuth#Secure
```
