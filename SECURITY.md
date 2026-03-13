# Security Documentation

## Overview

This document outlines the security measures implemented in the SeaReady website to protect user data, ensure PCI compliance for payment processing, and maintain the integrity of the application.

## Security Headers

All security headers are configured in `next.config.mjs`:

- **X-Frame-Options: DENY** - Prevents clickjacking attacks
- **X-Content-Type-Options: nosniff** - Prevents MIME type sniffing
- **X-XSS-Protection: 1; mode=block** - Enables XSS filtering
- **Referrer-Policy: strict-origin-when-cross-origin** - Controls referrer information
- **Permissions-Policy** - Disables unnecessary browser features (camera, microphone, geolocation)
- **Strict-Transport-Security** - Enforces HTTPS with HSTS preload
- **Content-Security-Policy** - Restricts resource loading to trusted sources

### CSP Configuration

The Content Security Policy allows:
- Scripts: Self-hosted and Stripe SDK only
- Styles: Self-hosted with inline styles for CSS-in-JS
- Images: Self-hosted, data URIs, and HTTPS sources
- Connections: API calls to self and Stripe only
- Frames: Stripe checkout and webhooks only

## Authentication & Authorization

- **Server-side session management** via Next.js middleware
- **Secure cookie configuration** with httpOnly, secure, and sameSite flags
- **CSRF protection** through server actions and proper origin checking

## Payment Security (PCI Compliance)

### Stripe Integration
- **Never store card details** - All payment data handled by Stripe
- **Webhook signature verification** - All webhooks verified using Stripe signatures
- **Customer Portal** - Billing management through Stripe's hosted portal
- **PCI DSS Level 1 compliance** via Stripe Checkout

### Implementation Details
```typescript
// Webhook signature verification (src/app/api/webhooks/stripe/route.ts)
event = constructWebhookEvent(
  Buffer.from(buf),
  sig,
  process.env.STRIPE_WEBHOOK_SECRET!
);
```

## Environment Variables

Required environment variables for production:

```bash
# Stripe Configuration (Production)
STRIPE_SECRET_KEY=sk_live_xxx          # Keep secret
STRIPE_PUBLISHABLE_KEY=pk_live_xxx     # Client-side safe
STRIPE_WEBHOOK_SECRET=whsec_xxx        # Keep secret

# Application
NEXT_PUBLIC_SITE_URL=https://seaready.co.uk
ENABLE_BILLING=true

# Database (if applicable)
DATABASE_URL=xxx                       # Keep secret
```

## API Security

### Rate Limiting
Rate limiting should be implemented at the edge (Cloudflare, Vercel) or via middleware:

```typescript
// Example rate limit middleware (to be implemented)
import { rateLimit } from '@/lib/rate-limit';

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await rateLimit.limit(ip);
  
  if (!success) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }
}
```

### Input Validation
- All form inputs validated on both client and server
- Email validation with regex patterns
- SQL injection prevention through parameterized queries
- XSS prevention through React's automatic escaping

## Data Protection

### Personal Data
- Minimal data collection (name, email, company)
- GDPR compliance with data minimization
- Right to erasure support through customer portal

### Encryption
- **TLS 1.3** for all data in transit
- **Database encryption at rest** (provider-dependent)
- **Secure session tokens** with cryptographic randomness

## Monitoring & Incident Response

### Logging
- Structured logging for security events
- Webhook processing errors logged
- Failed authentication attempts tracked

### Error Handling
- Generic error messages to users
- Detailed errors only in development
- Stack traces never exposed in production

## Security Checklist for Deployment

### Pre-Launch
- [ ] All environment variables set correctly
- [ ] Stripe webhook endpoint configured
- [ ] Security headers verified with SecurityHeaders.com
- [ ] SSL certificate valid and auto-renewing
- [ ] Database connection using SSL
- [ ] Rate limiting configured
- [ ] Error tracking service connected

### Post-Launch
- [ ] Monitor webhook failures
- [ ] Review security logs weekly
- [ ] Update dependencies monthly
- [ ] Penetration test annually
- [ ] PCI compliance attestation

## Vulnerability Reporting

Report security vulnerabilities to: security@seaready.co.uk

We aim to respond within 48 hours and provide fixes within 7 days for critical issues.

## Dependencies Security

Run regular security audits:

```bash
# Check for known vulnerabilities
npm audit

# Fix automatically where possible
npm audit fix

# Check for outdated packages
npm outdated
```

## Secrets Management

### Never Commit
- API keys
- Database credentials
- Webhook secrets
- JWT secrets
- Any tokens or passwords

### Use Instead
- Environment variables
- Secret management services
- CI/CD secret injection

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [Stripe Security](https://stripe.com/docs/security/stripe)
- [PCI DSS Requirements](https://www.pcisecuritystandards.org/)