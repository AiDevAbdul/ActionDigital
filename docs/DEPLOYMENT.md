# Deployment

## Vercel Deployment

This project is optimized for Vercel deployment.

## Build Process

```bash
npm run build              # Build for production (uses Turbopack)
npm start                  # Start production server
```

- Build uses **Turbopack** for faster compilation
- All 37 routes successfully generate during build
- Zero security vulnerabilities in dependencies (as of March 2026)

## Environment Variables

Configure these variables in Vercel project settings:

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `ADMIN_EMAIL` - Admin email address
- `ADMIN_PASSWORD` - Admin password
- `ADMIN_JWT_SECRET` - JWT signing secret
- `STRIPE_SECRET_KEY` - Stripe API key (v2026-02-25.clover)
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` - EmailJS service ID
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` - EmailJS template ID
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` - EmailJS public key

## Pre-deployment Checklist

- [ ] Run `npm run typecheck` - No type errors
- [ ] Run `npm run lint:check` - No linting errors
- [ ] Run `npm run test` - All tests pass
- [ ] Run `npm run build` - Build succeeds
- [ ] All environment variables configured in Vercel
- [ ] Database migrations applied (`npx prisma migrate deploy`)

## Deployment Steps

1. Push code to main branch
2. Vercel automatically detects changes
3. Build runs with Turbopack
4. Tests and checks execute
5. Deploy to production on success

## Monitoring

- Check Vercel dashboard for build logs
- Monitor application performance in Vercel Analytics
- Review error logs in Vercel Functions
