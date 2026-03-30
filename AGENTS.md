# Repository Guidelines

## Project Overview
Next.js 16.1.6 (App Router) TypeScript app with React 19, PostgreSQL + Prisma, Stripe payments, and Vitest testing. Deployed on Vercel with Turbopack.

## Tech Stack (March 2026)
- **Framework**: Next.js 16.1.6 with Turbopack
- **Runtime**: React 19.2.4
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4.2.1
- **Database**: PostgreSQL + Prisma ORM 6.19.2
- **Payments**: Stripe 20.4.0 (API v2026-02-25.clover)
- **Validation**: Zod 4.3.6
- **Testing**: Vitest 4.0.18
- **Icons**: Lucide React 0.575.0

## Key Directories
- `src/app/` - Routes, layouts, API endpoints
- `src/components/` - React components (PascalCase.tsx)
- `src/lib/` - Utilities (auth, db, motion-shim)
- `src/context/` - React providers
- `prisma/` - Database schema & migrations
- `docs/` - Detailed documentation

## Development Commands
```bash
npm run dev              # Start dev server
npm run build            # Production build (Turbopack)
npm run lint:fix         # Auto-fix linting
npm run typecheck        # Type checking
npm run test             # Run tests
npx prisma migrate dev   # Database migrations
npm install --legacy-peer-deps  # Install dependencies
```

## Critical Rules

### Next.js 16 Breaking Changes
1. **Dynamic params are Promises**: `{ params: Promise<{ id: string }> }`
2. **Check env vars at runtime**: Inside route handlers, not at module load
3. **Client components**: Pages using motion must have `'use client'`

### Code Style
- TypeScript + React (TSX), 2-space indentation, semicolons
- Single quotes in TS/TSX
- Use `@/` alias for imports (maps to `src/`)
- Component files: `PascalCase.tsx`, hooks: `useThing.ts`

### Authentication
- Custom JWT in `src/lib/auth.ts` (HMAC-SHA256)
- Cookie: `adi_admin`
- Middleware protects `/admin/*` and write operations to `/api/projects/*`

### Motion & Animation
- Use `@/lib/motion-shim`, not `framer-motion`
- Motion shim strips props for React 19 compatibility
- Pages using motion must be client components

### Database
- Prisma 6.19.2 (not 7.x - breaking changes)
- Always run `npx prisma generate` after schema changes
- Always run `npx prisma migrate dev` after modifying schema

## Testing
- Vitest 4.0.18 with Node environment
- Test files: `src/**/*.test.ts` (excluded from TypeScript compilation)
- Globals enabled: `describe`, `it`, `expect`
- Run: `npm run test` or `vitest run src/lib/auth.test.ts`

## Commit Style
Use Conventional Commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `refactor:` - Code refactoring
- `style:` - Formatting
- `docs:` - Documentation
- `chore:` - Maintenance
- `test:` - Test additions

Include: `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`

## Security
- Security headers in `next.config.js` (CSP, HSTS, X-Frame-Options)
- Rate limiting in `src/lib/rateLimit.ts`
- Admin routes protected by JWT middleware
- Never commit secrets; use `.env.local` locally, configure in Vercel

## Deployment
- Optimized for Vercel
- Build uses Turbopack
- All 37 routes generate successfully
- Zero security vulnerabilities (March 2026)

## Documentation
Detailed guides in `docs/` directory:
- `ARCHITECTURE.md` - Structure & design
- `NEXT_JS_16.md` - Breaking changes
- `DATABASE.md` - Schema & migrations
- `AUTHENTICATION.md` - Auth implementation
- `API_ROUTES.md` - API conventions
- `TESTING.md` - Test setup
- `DEPLOYMENT.md` - Vercel deployment
- `MOTION.md` - Animation strategy
- `SECURITY.md` - Security practices
- `README.md` - Documentation index

See `CLAUDE.md` for quick reference.
