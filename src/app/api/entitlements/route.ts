// app/api/entitlements/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptionForOrg } from '@/lib/services/billing';
import { getEntitlements, canAccessApp, getPlanFromPriceId } from '@/lib/entitlements';

const BILLING_ENABLED = process.env.ENABLE_BILLING === 'true';

export async function GET(req: NextRequest) {
  try {
    // Get orgId from query params
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get('orgId');
    
    if (!orgId) {
      return NextResponse.json(
        { error: 'Missing orgId parameter' },
        { status: 400 }
      );
    }
    
    // TODO: Verify authentication token from app
    // const authHeader = req.headers.get('authorization');
    // if (!authHeader?.startsWith('Bearer ')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    // const token = authHeader.split(' ')[1];
    // Verify token and ensure it matches orgId
    
    // If billing is disabled, return full access
    if (!BILLING_ENABLED) {
      return NextResponse.json({
        orgId,
        planKey: 'enterprise',
        planName: 'Enterprise (Billing Disabled)',
        status: 'active',
        canAccess: true,
        limits: {
          vessels: 'unlimited',
          users: 'unlimited',
          bulkExports: true,
          sso: true,
        },
        features: {
          drills: true,
          defects: true,
          maintenance: true,
          offlineMode: true,
          exports: true,
        },
        billingEnabled: false,
      });
    }
    
    // Get subscription from database
    const subscription = await getSubscriptionForOrg(orgId);
    
    if (!subscription) {
      // No subscription found
      return NextResponse.json({
        orgId,
        planKey: null,
        planName: 'No Subscription',
        status: 'inactive',
        canAccess: false,
        limits: {
          vessels: 0,
          users: 0,
          bulkExports: false,
          sso: false,
        },
        features: {
          drills: false,
          defects: false,
          maintenance: false,
          offlineMode: false,
          exports: false,
        },
        billingEnabled: true,
        redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      });
    }
    
    // Get plan details and entitlements
    const planKey = getPlanFromPriceId(subscription.stripePriceId);
    const entitlements = getEntitlements(
      planKey,
      subscription.status
    );
    
    // Build response with cache headers
    const response = NextResponse.json({
      orgId,
      subscriptionId: subscription.id,
      ...entitlements,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      billingEnabled: true,
      redirectUrl: canAccessApp(subscription.status) 
        ? null 
        : `${process.env.NEXT_PUBLIC_SITE_URL}/account/billing`,
    });
    
    // Cache for 60 seconds to reduce database load
    response.headers.set(
      'Cache-Control',
      'private, max-age=60, stale-while-revalidate=30'
    );
    
    return response;
    
  } catch (error) {
    console.error('Entitlements API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: POST endpoint to refresh entitlements cache
export async function POST(req: NextRequest) {
  try {
    const { orgId } = await req.json();
    
    if (!orgId) {
      return NextResponse.json(
        { error: 'Missing orgId' },
        { status: 400 }
      );
    }
    
    // TODO: Verify admin token
    // This endpoint could be called by webhooks to invalidate cache
    
    // For now, just return success
    return NextResponse.json({ 
      success: true, 
      message: 'Cache invalidated' 
    });
    
  } catch (error) {
    console.error('Cache invalidation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}