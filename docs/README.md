# Documentation Index

Quick navigation for all project documentation.

## Quick Start
- **CLAUDE.md** - Quick reference (start here)

## Core Documentation

### Architecture & Structure
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Project structure, components, utilities, path aliases, coding style

### Framework & Breaking Changes
- **[NEXT_JS_16.md](NEXT_JS_16.md)** - Next.js 16 breaking changes, dynamic params, env vars, TypeScript config

### Database
- **[DATABASE.md](DATABASE.md)** - Prisma setup, schema overview, migrations, commands

### Authentication & Security
- **[AUTHENTICATION.md](AUTHENTICATION.md)** - JWT implementation, credentials, protected routes, login flow
- **[SECURITY.md](SECURITY.md)** - Security headers, rate limiting, input validation, OWASP prevention

### API & Integration
- **[API_ROUTES.md](API_ROUTES.md)** - RESTful conventions, endpoints, authentication requirements

### Development & Deployment
- **[TESTING.md](TESTING.md)** - Vitest setup, running tests, writing tests, best practices
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Vercel deployment, build process, environment variables, checklist
- **[MOTION.md](MOTION.md)** - Motion shim strategy, usage, client components

## Tech Stack Summary
- Next.js 16.1.6 (Turbopack) | React 19.2.4 | TypeScript | Tailwind CSS v4.2.1
- PostgreSQL + Prisma 6.19.2 | Stripe 20.4.0 | Vitest 4.0.18 | Vercel

## Key Commands
```bash
npm run dev              # Development
npm run build            # Production build
npm run lint:fix         # Fix linting
npm run typecheck        # Type check
npm run test             # Run tests
npx prisma migrate dev   # Database migrations
```

## Environment Variables
See [DEPLOYMENT.md](DEPLOYMENT.md) for complete list of required environment variables.

---
Last updated: March 2026
