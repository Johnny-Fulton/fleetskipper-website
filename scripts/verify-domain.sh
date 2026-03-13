#!/bin/bash
# Domain Verification Script
# Checks if seaready.co.uk is properly pointing to Vercel

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "🔍  DOMAIN VERIFICATION - seaready.co.uk"
echo "═══════════════════════════════════════════════════════════"
echo ""

echo "📍 Checking DNS A record..."
CURRENT_IP=$(dig +short seaready.co.uk A | head -1)
echo "   Current IP: $CURRENT_IP"
echo "   Expected:   76.76.21.21"
echo ""

if [ "$CURRENT_IP" = "76.76.21.21" ]; then
  echo "✅ DNS is correct!"
else
  echo "⏳ DNS not propagated yet (still showing old IP)"
  echo "   This is normal - DNS can take 5-60 minutes to update"
fi

echo ""
echo "📍 Testing HTTP connection..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://seaready.co.uk)
echo "   HTTP Status: $HTTP_STATUS"

if [ "$HTTP_STATUS" = "200" ]; then
  SERVER=$(curl -s -I https://seaready.co.uk | grep -i "server:" | cut -d' ' -f2-)
  echo "   Server: $SERVER"

  if [[ "$SERVER" == *"Vercel"* ]] || [[ "$SERVER" == *"now"* ]]; then
    echo ""
    echo "✅ Domain is working and pointing to Vercel!"
    echo "   Visit: https://seaready.co.uk"
  else
    echo ""
    echo "⏳ Still pointing to old server"
    echo "   Server shows: $SERVER"
    echo "   Wait a bit longer for DNS to propagate"
  fi
else
  echo "   ⏳ Not accessible yet"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "To check Vercel domain status:"
echo "  cd /Users/jonathanfulton/REGULATION\ APP/SeaReady/assistants/website"
echo "  vercel domains inspect seaready.co.uk"
echo ""
