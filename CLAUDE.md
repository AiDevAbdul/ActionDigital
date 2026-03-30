# CLAUDE.md

Quick reference for Claude Code working with this Next.js 16 portfolio & LMS project.

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **Language**: TypeScript (strict), React 19.2.4
- **Styling**: Tailwind CSS v4.2.1
- **Database**: PostgreSQL + Prisma ORM 6.19.2
- **Testing**: Vitest 4.0.18
- **Deployment**: Vercel

## Quick Commands
```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run lint:fix         # Auto-fix linting
npm run typecheck        # Type checking
npm run test             # Run tests
npx prisma migrate dev   # Database migrations
```

## Key Paths
- `src/app/` - Routes & API endpoints
- `src/components/` - React components
- `src/lib/` - Utilities (auth, db, motion-shim)
- `src/context/` - React providers
- `prisma/` - Database schema

## Critical Rules
1. **Next.js 16 Breaking Changes**: Dynamic route params are `Promise<{ id }>`, check env vars at runtime
2. **Auth**: Custom JWT in `src/lib/auth.ts`, cookie: `adi_admin`
3. **Motion**: Use `@/lib/motion-shim`, not `framer-motion` (React 19 compatible)
4. **Imports**: Always use `@/` alias (maps to `src/`)
5. **Dependencies**: Install with `npm install --legacy-peer-deps`

## Documentation
Detailed guides in `docs/` directory:
- `ARCHITECTURE.md` - Project structure & design
- `NEXT_JS_16.md` - Breaking changes & migration
- `DATABASE.md` - Schema & migrations
- `AUTHENTICATION.md` - Auth implementation
- `API_ROUTES.md` - API conventions
- `TESTING.md` - Test setup & guidelines
- `DEPLOYMENT.md` - Vercel deployment

See specific docs for detailed information.
