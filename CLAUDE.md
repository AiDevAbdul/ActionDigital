# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 portfolio and Learning Management System (LMS) for Action Digital Institute, showcasing AI Engineering, Digital Marketing, and Skills Development services. The site includes a public portfolio, blog, courses section, and an admin panel for content management.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with PostCSS
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe integration
- **Testing**: Vitest
- **Deployment**: Vercel

## Development Commands

```bash
# Development
npm run dev                 # Start dev server at localhost:3000

# Building & Production
npm run build              # Build for production
npm start                  # Start production server

# Code Quality
npm run lint               # Run Next.js linter
npm run lint:check         # Check for linting errors (ESLint)
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
  - Shared: `Header`, `Footer`, `AnimatedPageWrapper`, `MotionSection`

- **`src/lib/`**: Utility libraries
  - `db.ts`: Prisma client singleton
  - `auth.ts`: Custom JWT implementation using Web Crypto API (no external JWT library)
  - `rateLimit.ts`: Rate limiting utilities
  - `site.ts`: Site configuration and metadata
  - `motion-shim.tsx`: Framer Motion shim that strips motion props (used for SSR compatibility)

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
- Components using `motion.*` will render without animations

If you need to add animations, import from `@/lib/motion-shim` not `framer-motion`.

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
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`: Payment processing
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

- Tests use Vitest with Node environment
- Test files: `src/**/*.test.ts`
- Globals enabled for describe/it/expect
- Currently has auth unit tests in `src/lib/auth.test.ts`

## Important Notes

- The project uses **Tailwind CSS v4** (not v3), which has different configuration
- **No Framer Motion animations** are active due to the motion shim
- Admin panel requires manual login at `/admin/login` before accessing `/admin`
- Database migrations are in `prisma/migrations/` - always run `npx prisma migrate dev` after schema changes
- The site defaults to dark theme (see `src/app/layout.tsx` theme initialization)
