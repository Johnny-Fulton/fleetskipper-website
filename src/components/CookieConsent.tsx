'use client'

import { useEffect } from 'react'
import * as CookieConsent from 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'

/**
 * GDPR/UK PECR Compliant Cookie Consent Banner
 *
 * This component implements cookie consent in compliance with:
 * - UK GDPR
 * - Privacy and Electronic Communications Regulations (PECR)
 * - ICO Guidelines 2025
 *
 * Features:
 * - Blocks Google Analytics until consent given
 * - Google Consent Mode V2 integration
 * - Granular cookie categories
 * - Persistent consent storage
 * - Revocable consent
 */

export function CookieConsentBanner() {
  useEffect(() => {
    CookieConsent.run({
      // Consent must be given before cookies are set (UK PECR requirement)
      mode: 'opt-in',

      // Cookie expires after 182 days (6 months) - ICO recommendation
      cookie: {
        name: 'cc_cookie',
        expiresAfterDays: 182,
      },

      // Show consent banner on page load if not already consented
      autoShow: true,

      // Disable page interaction until consent given (optional - can be removed if too aggressive)
      disablePageInteraction: false,

      // GUI Options - customize to match SeaReady branding
      guiOptions: {
        consentModal: {
          layout: 'box inline',
          position: 'bottom right',
          equalWeightButtons: false,
          flipButtons: false,
        },
        preferencesModal: {
          layout: 'box',
          position: 'right',
          equalWeightButtons: true,
          flipButtons: false,
        },
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true, // Cannot be disabled - essential for site operation
        },
        analytics: {
          enabled: false, // Must opt-in
          autoClear: {
            cookies: [
              { name: /^_ga/ }, // Google Analytics cookies
              { name: '_gid' },
              { name: '_gat' },
            ],
          },
        },
      },

      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: 'We use cookies',
              description:
                'We use cookies to improve your experience on our site. Some cookies are essential for the site to work, while others help us understand how you use it so we can make improvements. You can choose which cookies to accept.',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              showPreferencesBtn: 'Manage preferences',
              footer: `
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/cookie-policy">Cookie Policy</a>
              `,
            },
            preferencesModal: {
              title: 'Cookie preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Save preferences',
              closeIconLabel: 'Close',
              serviceCounterLabel: 'Service|Services',
              sections: [
                {
                  title: 'Cookie usage',
                  description:
                    'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose to opt in or out for each category at any time.',
                },
                {
                  title: 'Strictly necessary cookies',
                  description:
                    'These cookies are essential for the proper functioning of our website. Without these cookies, the website would not work properly. They do not store any personally identifiable information.',
                  linkedCategory: 'necessary',
                  cookieTable: {
                    headers: {
                      name: 'Cookie',
                      domain: 'Domain',
                      description: 'Description',
                      expiration: 'Expiration',
                    },
                    body: [
                      {
                        name: 'cc_cookie',
                        domain: location.hostname,
                        description: 'Stores your cookie consent preferences',
                        expiration: '6 months',
                      },
                    ],
                  },
                },
                {
                  title: 'Analytics cookies',
                  description:
                    'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use Google Analytics 4 to track page views, user journeys, and site performance.',
                  linkedCategory: 'analytics',
                  cookieTable: {
                    headers: {
                      name: 'Cookie',
                      domain: 'Domain',
                      description: 'Description',
                      expiration: 'Expiration',
                    },
                    body: [
                      {
                        name: '_ga',
                        domain: 'Google Analytics',
                        description: 'Distinguishes unique users',
                        expiration: '2 years',
                      },
                      {
                        name: '_gid',
                        domain: 'Google Analytics',
                        description: 'Distinguishes unique users',
                        expiration: '24 hours',
                      },
                      {
                        name: '_gat',
                        domain: 'Google Analytics',
                        description: 'Throttles request rate',
                        expiration: '1 minute',
                      },
                    ],
                  },
                },
                {
                  title: 'More information',
                  description:
                    'For any queries in relation to our policy on cookies and your choices, please <a href="/contact">contact us</a>. You can review our <a href="/privacy-policy">Privacy Policy</a> and <a href="/cookie-policy">Cookie Policy</a> for more details.',
                },
              ],
            },
          },
        },
      },

      // Callback: when consent is given/updated
      onChange: ({ changedCategories }) => {
        // Update Google Consent Mode based on user preferences
        if (changedCategories.includes('analytics')) {
          const analyticsConsent = CookieConsent.acceptedCategory('analytics')

          // Update Google Consent Mode V2
          if (typeof window !== 'undefined' && 'gtag' in window) {
            const gtag = (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag
            gtag('consent', 'update', {
              analytics_storage: analyticsConsent ? 'granted' : 'denied',
            })
          }
        }
      },

      // Callback: when consent modal is first shown
      onFirstConsent: ({ cookie }) => {
        // Log first consent (optional - for debugging)
        console.log('First consent recorded:', cookie)
      },

      // Callback: when consent changes
      onConsent: ({ cookie }) => {
        // Log consent state (optional - for debugging)
        console.log('Consent updated:', cookie)
      },
    })
  }, [])

  return null // This component only manages state, no UI rendered here
}

/**
 * Helper function to check if analytics cookies are accepted
 * Use this to conditionally load tracking scripts
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  return CookieConsent.acceptedCategory('analytics')
}

/**
 * Helper function to programmatically show cookie settings
 * Use this for "Cookie Settings" links in footer
 */
export function showCookieSettings() {
  CookieConsent.showPreferences()
}
