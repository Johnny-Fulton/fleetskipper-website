#!/bin/bash

echo "========================================="
echo "🚀 FLEETSKIPPER VERCEL DEPLOYMENT"
echo "========================================="
echo ""

cd "/Users/jonathanfulton/REGULATION APP/FleetSkipper/website"

echo "Step 1: Logging into Vercel..."
echo "(A browser window will open - click 'Confirm' to authorize)"
echo ""

vercel login

echo ""
echo "Step 2: Deploying to production..."
echo "(This will take 2-3 minutes)"
echo ""

vercel --prod --yes

echo ""
echo "========================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo "========================================="
echo ""
echo "Next: Configure Cloudflare DNS"
echo "See: CLOUDFLARE_DNS_SETUP.md"
echo ""
