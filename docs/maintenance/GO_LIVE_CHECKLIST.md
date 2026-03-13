# Go-Live Checklist for SeaReady

## Pre-Launch Requirements

### 1. Infrastructure & Hosting
- [ ] Production domain configured (seaready.co.uk)
- [ ] SSL certificate active and auto-renewing
- [ ] DNS records properly configured
- [ ] CDN configured (Cloudflare/Vercel Edge)
- [ ] Database production instance ready
- [ ] Backup strategy in place

### 2. Environment Configuration
- [ ] All production environment variables set:
  ```bash
  NEXT_PUBLIC_SITE_URL=https://seaready.co.uk
  STRIPE_SECRET_KEY=sk_live_xxx
  STRIPE_PUBLISHABLE_KEY=pk_live_xxx
  STRIPE_WEBHOOK_SECRET=whsec_xxx
  ENABLE_BILLING=true
  DATABASE_URL=xxx
  ```
- [ ] Environment variables secured (not in code)
- [ ] Different keys for dev/staging/production

### 3. Stripe Setup
- [ ] Stripe account verified and activated
- [ ] Production API keys configured
- [ ] Webhook endpoint added in Stripe Dashboard:
  - URL: `https://seaready.co.uk/api/webhooks/stripe`
  - Events to listen for:
    - `checkout.session.completed`
    - `customer.subscription.created`
    - `customer.subscription.updated`
    - `customer.subscription.deleted`
    - `invoice.payment_failed`
- [ ] Webhook secret saved in environment
- [ ] Customer Portal configured in Stripe
- [ ] VAT collection enabled for UK/EU
- [ ] Test payment flow end-to-end

### 4. Security Hardening
- [ ] Security headers configured (check with securityheaders.com)
- [ ] CSP policy tested and working
- [ ] Rate limiting enabled on API routes
- [ ] CORS configured appropriately
- [ ] Authentication flow tested
- [ ] Session management secure
- [ ] No sensitive data in client-side code
- [ ] No API keys or secrets in repository

### 5. Code Quality & Testing
- [ ] All tests passing:
  ```bash
  npm run test
  npm run test:e2e
  ```
- [ ] Linting passing:
  ```bash
  npm run lint
  npm run typecheck
  ```
- [ ] No console.log statements in production
- [ ] Error boundaries implemented
- [ ] 404 and error pages customized
- [ ] Loading states for all async operations

### 6. Performance Optimization
- [ ] Lighthouse score > 90 for all metrics
- [ ] Images optimized and using Next.js Image
- [ ] Fonts optimized and preloaded
- [ ] JavaScript bundle size acceptable
- [ ] Critical CSS inlined
- [ ] Lazy loading implemented where appropriate

### 7. Legal & Compliance
- [ ] Privacy Policy published and linked
- [ ] Terms of Service published and linked
- [ ] Cookie consent banner (if needed)
- [ ] GDPR compliance verified
- [ ] UK data protection requirements met
- [ ] Accessibility (WCAG 2.1 AA) tested

### 8. Content & Copy
- [ ] All placeholder content replaced
- [ ] Contact information accurate
- [ ] Support email configured
- [ ] Social media links working
- [ ] Meta tags and SEO optimized
- [ ] Open Graph tags configured
- [ ] Sitemap generated
- [ ] Robots.txt configured

### 9. Monitoring & Analytics
- [ ] Error tracking configured (Sentry/Rollbar)
- [ ] Analytics configured (GA4/Plausible)
- [ ] Uptime monitoring configured
- [ ] Log aggregation set up
- [ ] Performance monitoring enabled
- [ ] Webhook failure alerts configured

### 10. Backup & Recovery
- [ ] Database backup scheduled
- [ ] Recovery plan documented
- [ ] Rollback procedure tested
- [ ] Data export functionality verified

## Launch Day

### Morning of Launch
- [ ] Final backup of current state
- [ ] Team communication channels ready
- [ ] Support inbox monitored
- [ ] Status page ready (if applicable)

### Deployment Steps
1. [ ] Set maintenance mode (if migrating)
2. [ ] Deploy to production
3. [ ] Run database migrations
4. [ ] Verify environment variables
5. [ ] Test critical paths:
   - [ ] Homepage loads
   - [ ] Sign up flow works
   - [ ] Payment processing works
   - [ ] Login/logout works
   - [ ] Key features functional
6. [ ] Remove maintenance mode
7. [ ] Clear CDN cache
8. [ ] Monitor error logs

### Post-Launch Verification
- [ ] Test from different devices/browsers
- [ ] Verify SSL certificate
- [ ] Check security headers
- [ ] Test payment flow with real card
- [ ] Verify webhook processing
- [ ] Check email deliverability
- [ ] Monitor performance metrics
- [ ] Review error tracking

## Week 1 Post-Launch

### Daily Tasks
- [ ] Monitor error logs
- [ ] Review user feedback
- [ ] Check webhook failures
- [ ] Monitor performance metrics
- [ ] Review security alerts

### End of Week 1
- [ ] Performance review meeting
- [ ] Address critical issues
- [ ] Plan improvements
- [ ] Update documentation
- [ ] Team retrospective

## Month 1 Post-Launch

### Weekly Reviews
- [ ] User acquisition metrics
- [ ] Conversion funnel analysis
- [ ] Support ticket trends
- [ ] Performance trends
- [ ] Security audit

### End of Month 1
- [ ] Full security review
- [ ] Dependency updates
- [ ] Performance optimization
- [ ] Feature roadmap update
- [ ] Customer feedback analysis

## Rollback Plan

If critical issues arise:

1. **Immediate Actions:**
   - [ ] Enable maintenance mode
   - [ ] Notify team via Slack/Discord
   - [ ] Document issue

2. **Rollback Steps:**
   ```bash
   # Revert to previous deployment
   git revert HEAD
   git push origin main
   
   # Or use platform-specific rollback
   vercel rollback
   ```

3. **Post-Rollback:**
   - [ ] Verify site functionality
   - [ ] Communicate status update
   - [ ] Root cause analysis
   - [ ] Fix and test locally
   - [ ] Plan re-deployment

## Emergency Contacts

- **Technical Lead:** [Name] - [Phone]
- **DevOps:** [Name] - [Phone]  
- **Stripe Support:** +44 20 3893 3898
- **Hosting Support:** [Platform support]
- **Domain Registrar:** [Registrar support]

## Notes

- Always test payment flows with real cards in production (small amounts)
- Keep this checklist updated with lessons learned
- Schedule the launch for Tuesday-Thursday (avoid Mondays and Fridays)
- Have a "war room" communication channel ready
- Celebrate the launch! 🎉