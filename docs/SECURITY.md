# Security

## Security Headers

Security headers are configured in `next.config.js`:
- **CSP** (Content Security Policy) - Prevents XSS attacks
- **HSTS** (HTTP Strict Transport Security) - Enforces HTTPS
- **X-Frame-Options** - Prevents clickjacking
- **X-Content-Type-Options** - Prevents MIME sniffing

Production environment uses strict CSP and HSTS headers.

## Authentication Security

- Custom JWT implementation using Web Crypto API (HMAC-SHA256)
- Tokens stored in secure HTTP-only cookies
- Cookie name: `adi_admin`
- Default expiry: 7 days
- Middleware validates tokens on protected routes

## Rate Limiting

Rate limiting utilities available in `src/lib/rateLimit.ts` for:
- API endpoint protection
- Brute force attack prevention
- DDoS mitigation

## Environment Variables

Never commit secrets to version control:
- Use `.env.local` for local development
- Configure same variables in hosting provider (Vercel)
- Required secrets:
  - `ADMIN_JWT_SECRET` - JWT signing key
  - `STRIPE_SECRET_KEY` - Stripe API key
  - `STRIPE_WEBHOOK_SECRET` - Webhook verification
  - `DATABASE_URL` - Database connection string

## Input Validation

- Use Zod 4.3.6 for schema validation
- Validate all user input at system boundaries
- Validate API request bodies
- Validate form submissions

## OWASP Top 10 Prevention

- **Injection**: Parameterized queries via Prisma ORM
- **Broken Auth**: JWT-based authentication with secure cookies
- **Sensitive Data**: HTTPS enforced, secrets in env vars
- **XML/XXE**: Not applicable (JSON-based APIs)
- **Broken Access Control**: Middleware protects admin routes
- **Security Misconfiguration**: Security headers configured
- **XSS**: CSP headers, input validation
- **Insecure Deserialization**: No unsafe deserialization
- **Using Components with Known Vulnerabilities**: Regular dependency updates
- **Insufficient Logging**: Monitor Vercel logs and analytics
