# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 portfolio and Learning Management System (LMS) for Action Digital Institute, showcasing AI Engineering, Digital Marketing, and Skills Development services. The site includes a public portfolio, blog, courses section, and an admin panel for content management.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router with Turbopack)
- **Language**: TypeScript (strict mode)
- **Runtime**: React 19.2.4
- **Styling**: Tailwind CSS v4.2.1 with PostCSS
- **Database**: PostgreSQL with Prisma ORM 6.19.2
- **Payments**: Stripe 20.4.0 (API version: 2026-02-25.clover)
- **Validation**: Zod 4.3.6
- **Testing**: Vitest 4.0.18
- **Deployment**: Vercel

## Development Commands

```bash
# Development
npm run dev                 # Start dev server at localhost:3000

# Building & Production
npm run build              # Build for production (uses Turbopack)
npm start                  # Start production server

# Code Quality
npm run lint               # Run Next.js linter
npm run lint:check         # Check for linting errors (ESLint 10.0.2)
npm run lint:fix           # Auto-fix linting errors
npm run typecheck          # Run TypeScript type checking

# Testing
npm run test               # Run all tests with Vitest
vitest run src/lib/auth.test.ts  # Run specific test file

# Database
npx prisma generate        # Generate Prisma client after schema changes
npx prisma migrate dev     # Create and apply migrations in development
npx prisma migrate deploy  # Apply migrations in production
npx prisma studio          # Open Prisma Studio GUI

# Dependencies
npm install --legacy-peer-deps  # Install with legacy peer deps (required for some packages)
```

## Architecture

### App Structure

The project uses Next.js App Router with the following structure:

- **`src/app/`**: Next.js pages and API routes
  - Public pages: `/`, `/about`, `/services`, `/projects`, `/blog`, `/courses`, `/contact`
  - Admin pages: `/admin`, `/admin/login` (protected by middleware)
  - Dashboard: `/dashboard` (student LMS interface)
  - API routes: `/api/admin/*`, `/api/projects/*`, `/api/lms/*`, `/api/payments/*`

- **`src/components/`**: React components
  - Page components: `Hero`, `About`, `Services`, `ProjectsSection`, `CoursesSection`, etc.
  - Admin components: `ProjectForm`, `ProjectList` (in `admin/` subdirectory)
  - Blog components: `BlogPostContent` (in `blog/` subdirectory)
  - Shared: `Header`, `AnimatedPageWrapper`, `MotionSection`

- **`src/lib/`**: Utility libraries
  - `db.ts`: Prisma client singleton
  - `auth.ts`: Custom JWT implementation using Web Crypto API (no external JWT library)
  - `rateLimit.ts`: Rate limiting utilities
  - `site.ts`: Site configuration and metadata
  - `motion-shim.tsx`: Framer Motion shim that strips motion props (React 19 compatible)

- **`src/context/`**: React context providers
  - `ThemeProvider.tsx`: Dark/light theme management

### Authentication & Authorization

- **Admin authentication** uses a custom JWT implementation in `src/lib/auth.ts` with HMAC-SHA256 signing
- Cookie name: `adi_admin` (defined in `getAdminCookieName()`)
- Tokens expire based on `expiresInSeconds` parameter (typically 7 days)
- **Middleware** (`middleware.ts`) protects:
  - All `/admin/*` routes except `/admin/login`
  - Write operations (POST/PUT/PATCH/DELETE) to `/api/projects/*`
- Admin credentials are stored in environment variables: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`

### Next.js 16 Breaking Changes

**IMPORTANT**: Next.js 16 introduced breaking changes that affect API routes:

1. **Dynamic Route Params are now Promises**: All API routes with dynamic segments must use `Promise<{ id: string }>` instead of `{ id: string }`
   ```typescript
   // ✅ Correct (Next.js 16)
   export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
     const { id } = await params;
     // use id
   }

   // ❌ Wrong (Next.js 15 and earlier)
   export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
     const id = params.id;
     // use id
   }
   ```

2. **Environment Variables in API Routes**: Avoid checking environment variables at module load time. Check them inside the route handler to prevent build-time errors:
   ```typescript
   // ✅ Correct - check at runtime
   export async function POST(request: NextRequest) {
     const secret = process.env.STRIPE_SECRET_KEY;
     if (!secret) {
       return Response.json({ error: 'Not configured' }, { status: 500 });
     }
     // use secret
   }

   // ❌ Wrong - throws at build time
   const secret = process.env.STRIPE_SECRET_KEY;
   if (!secret) throw new Error('Missing STRIPE_SECRET_KEY');
   ```

### Database Schema

The Prisma schema includes two main domains:

1. **Portfolio/Projects**: `Project` model for showcasing work
2. **LMS (Learning Management System)**: Full course platform with:
   - `User` (with roles: ADMIN, INSTRUCTOR, STUDENT)
   - `Course` → `Module` → `Lesson` hierarchy
   - `Enrollment`, `LessonProgress`, `Certificate` for student tracking
   - `Payment` and `Coupon` for monetization
   - Support for different lesson types: VIDEO, TEXT, PDF, QUIZ, ASSIGNMENT
   - Course access types: FREE, PAID, SUBSCRIPTION

### Motion/Animation Strategy

The project uses a **motion shim** (`src/lib/motion-shim.tsx`) instead of Framer Motion directly. This shim:
- Strips all Framer Motion props (initial, animate, variants, etc.)
- Renders plain HTML elements without animations
- Prevents SSR hydration issues
- Compatible with React 19
- Components using `motion.*` will render without animations

**Important**: Pages using the motion shim must be client components (`'use client'` directive). If you need to add animations, import from `@/lib/motion-shim` not `framer-motion`.

### API Routes

API routes follow RESTful conventions:
- **Admin**: `/api/admin/login`, `/api/admin/logout`
- **Projects**: `/api/projects` (GET all, POST create), `/api/projects/[id]` (GET, PUT, DELETE)
- **LMS**: `/api/lms/courses`, `/api/lms/modules`, `/api/lms/lessons`, `/api/lms/enrollments`, `/api/lms/progress`, `/api/lms/certificates`, `/api/lms/payments`
- **Payments**: `/api/payments/stripe/intent`, `/api/payments/stripe/webhook`

All write operations to protected routes require admin authentication via JWT cookie.

### Environment Variables

Required environment variables (see `README.md` for full list):
- `DATABASE_URL`: PostgreSQL connection string
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`: Admin authentication
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`: Payment processing (Stripe API v2026-02-25.clover)
- `NEXT_PUBLIC_EMAILJS_*`: Contact form integration

### Path Aliases

TypeScript is configured with `@/*` alias mapping to `./src/*`. Always use this alias for imports:
```typescript
import Header from '@/components/Header';
import { db } from '@/lib/db';
```

### Security

- Security headers configured in `next.config.js` (CSP, HSTS, X-Frame-Options, etc.)
- Production-only strict CSP and HSTS headers
- Rate limiting utilities available in `src/lib/rateLimit.ts`
- Admin routes protected by middleware with JWT verification

### Testing

- Tests use Vitest 4.0.18 with Node environment
- Test files: `src/**/*.test.ts` (excluded from TypeScript compilation)
- Globals enabled for describe/it/expect in `vitest.config.ts`
- Currently has auth unit tests in `src/lib/auth.test.ts`
- TypeScript config excludes test files to avoid type conflicts

### TypeScript Configuration

- **jsx**: Set to `react-jsx` (React automatic runtime, required by Next.js 16)
- **types**: Only includes `node` (vitest types excluded from main compilation)
- **exclude**: Test files (`**/*.test.ts`, `**/*.test.tsx`) are excluded
- **include**: Includes `.next/dev/types/**/*.ts` for Next.js type generation

## Important Notes

- The project uses **Tailwind CSS v4.2.1** (not v3), which has different configuration
- **No Framer Motion animations** are active due to the motion shim
- Admin panel requires manual login at `/admin/login` before accessing `/admin`
- Database migrations are in `prisma/migrations/` - always run `npx prisma migrate dev` after schema changes
- The site defaults to dark theme (see `src/app/layout.tsx` theme initialization)
- **Prisma 6.x** is used (not 7.x) - Prisma 7 has breaking changes with datasource configuration
- When installing dependencies, use `npm install --legacy-peer-deps` due to peer dependency conflicts
- Build uses **Turbopack** for faster compilation
- All dependencies are up-to-date as of March 2026
