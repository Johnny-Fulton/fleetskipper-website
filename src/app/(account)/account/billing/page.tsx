// app/(account)/account/billing/page.tsx
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createPortal } from '@/lib/actions/createPortal';
import { getPlanFromPriceId, getStatusColor, canAccessApp } from '@/lib/entitlements';
import { plans } from '@/lib/entitlements';
import type { SubscriptionStatus } from '@/lib/entitlements';

// Mock function - replace with real auth/db
async function getCurrentSubscription() {
  // TODO: Get from session and database
  // const session = await getSession();
  // const subscription = await db.subscriptions.findUnique({
  //   where: { orgId: session.orgId }
  // });
  
  // Mock data for demo
  return {
    status: 'active' as SubscriptionStatus,
    stripePriceId: 'price_fleet_monthly',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    cancelAtPeriodEnd: false,
    trialEnd: null,
  };
}

export default async function BillingPage() {
  // TODO: Check auth
  // const session = await getSession();
  // if (!session) redirect('/login');
  
  const subscription = await getCurrentSubscription();
  
  if (!subscription) {
    redirect('/pricing');
  }

  const planKey = getPlanFromPriceId(subscription.stripePriceId);
  const plan = plans[planKey];
  const statusColor = getStatusColor(subscription.status);
  const hasAccess = canAccessApp(subscription.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Account Billing</h1>
            </div>
            <Link 
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Back to site
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Alert for trial or issues */}
        {subscription.status === 'trialing' && subscription.trialEnd && (
          <div className="mb-6 rounded-lg bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Your trial ends on {new Date(subscription.trialEnd).toLocaleDateString('en-GB')}. 
                  Add payment details to continue access after the trial.
                </p>
              </div>
            </div>
          </div>
        )}

        {subscription.status === 'past_due' && (
          <div className="mb-6 rounded-lg bg-orange-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-orange-700">
                  Your payment is past due. Please update your payment method to maintain access.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Subscription Details
                </h3>
                <div className="mt-3 space-y-3">
                  {/* Current Plan */}
                  <div className="flex items-center">
                    <dt className="text-sm font-medium text-gray-500 w-32">Plan:</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {plan.name}
                    </dd>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    <dt className="text-sm font-medium text-gray-500 w-32">Status:</dt>
                    <dd>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusColor}`}>
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1).replace('_', ' ')}
                      </span>
                    </dd>
                  </div>

                  {/* Price */}
                  <div className="flex items-center">
                    <dt className="text-sm font-medium text-gray-500 w-32">Price:</dt>
                    <dd className="text-sm text-gray-900">
                      {plan.price === 'custom' ? 'Contact sales' : `£${plan.price}/month`}
                    </dd>
                  </div>

                  {/* Next billing date */}
                  {subscription.currentPeriodEnd && (
                    <div className="flex items-center">
                      <dt className="text-sm font-medium text-gray-500 w-32">
                        {subscription.cancelAtPeriodEnd ? 'Expires:' : 'Next billing:'}
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-GB')}
                      </dd>
                    </div>
                  )}

                  {/* Cancellation pending */}
                  {subscription.cancelAtPeriodEnd && (
                    <div className="mt-4 rounded-md bg-yellow-50 p-3">
                      <p className="text-sm text-yellow-800">
                        Your subscription will not renew after the current billing period ends.
                      </p>
                    </div>
                  )}
                </div>

                {/* Plan limits */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Plan Limits</h4>
                  <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-center text-sm">
                      <dt className="text-gray-500">Vessels:</dt>
                      <dd className="ml-2 text-gray-900 font-medium">
                        {plan.vessels === 'unlimited' ? 'Unlimited' : plan.vessels}
                      </dd>
                    </div>
                    <div className="flex items-center text-sm">
                      <dt className="text-gray-500">Users:</dt>
                      <dd className="ml-2 text-gray-900 font-medium">
                        {plan.users === 'unlimited' ? 'Unlimited' : plan.users}
                      </dd>
                    </div>
                    <div className="flex items-center text-sm">
                      <dt className="text-gray-500">Support:</dt>
                      <dd className="ml-2 text-gray-900 font-medium capitalize">
                        {plan.support}
                      </dd>
                    </div>
                    <div className="flex items-center text-sm">
                      <dt className="text-gray-500">Bulk exports:</dt>
                      <dd className="ml-2 text-gray-900 font-medium">
                        {'bulkExports' in plan && plan.bulkExports ? 'Yes' : 'No'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                <form action={createPortal}>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Manage billing
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Usage section (optional) */}
        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Current Usage
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Vessels usage */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-gray-500">Vessels</span>
                  <span className="text-sm text-gray-900">
                    1 / {plan.vessels === 'unlimited' ? '∞' : plan.vessels}
                  </span>
                </div>
                <div className="mt-2 w-full rounded-full bg-gray-200">
                  <div 
                    className="h-2 rounded-full bg-token-navy" 
                    style={{ width: plan.vessels === 'unlimited' ? '5%' : '10%' }}
                  />
                </div>
              </div>

              {/* Users usage */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-gray-500">Users</span>
                  <span className="text-sm text-gray-900">
                    3 / {plan.users === 'unlimited' ? '∞' : plan.users}
                  </span>
                </div>
                <div className="mt-2 w-full rounded-full bg-gray-200">
                  <div 
                    className="h-2 rounded-full bg-token-navy" 
                    style={{ width: plan.users === 'unlimited' ? '5%' : '60%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help section */}
        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Need help?
            </h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>
                For billing questions, contact our support team at{' '}
                <a href="mailto:support@seaready.co.uk" className="text-indigo-600 hover:text-indigo-500">
                  support@seaready.co.uk
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}