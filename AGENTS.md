# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 16.1.6 (App Router) TypeScript app with React 19. Key paths:
- `src/app` for routes, layouts, and server/client components.
- `src/components` for shared UI building blocks.
- `src/context` for React context providers (theme, etc.).
- `src/data` for static data used by pages/components.
- `src/lib` for helpers and reusable logic.
- `public` for static assets.
- `prisma` for database schema and Prisma config.

## Build, Test, and Development Commands
- `npm run dev` starts the Next.js dev server at `http://localhost:3000`.
- `npm run build` creates a production build (uses Turbopack).
- `npm run start` runs the production server from the build output.
- `npm run lint` runs Next.js lint rules.
- `npm run lint:check` runs ESLint 10.0.2 on `.ts/.tsx` files.
- `npm run lint:fix` auto-fixes lintable issues where possible.
- `npm run typecheck` runs TypeScript type checking.
- `npm run test` runs Vitest 4.0.18 test suite.
- `npx prisma generate` regenerates the Prisma client after schema changes.
- `npx prisma migrate dev` creates and applies database migrations in development.
- `npm install --legacy-peer-deps` when installing dependencies (required for peer dependency conflicts).

## Tech Stack (Updated March 2026)
- **Framework**: Next.js 16.1.6 with Turbopack
- **Runtime**: React 19.2.4
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4.2.1
- **Database**: PostgreSQL with Prisma ORM 6.19.2
- **Payments**: Stripe 20.4.0 (API version: 2026-02-25.clover)
- **Validation**: Zod 4.3.6
- **Testing**: Vitest 4.0.18
- **Icons**: Lucide React 0.575.0

## Coding Style & Naming Conventions
- TypeScript + React (TSX) with 2-space indentation and semicolons.
- Prefer single quotes in TS/TSX (matches existing files).
- Use the path alias `@/` (maps to `src/`) for imports.
- Component files use `PascalCase.tsx`; hooks use `useThing.ts`.
- Tailwind CSS v4 is used for styling; keep class lists readable.

## Next.js 16 Breaking Changes
**IMPORTANT**: Next.js 16 introduced breaking changes:

1. **Dynamic Route Params are Promises**: All API routes with dynamic segments must use `Promise<{ id: string }>`:
   ```typescript
   // ✅ Correct
   export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
     const { id } = await params;
   }

   // ❌ Wrong
   export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
     const id = params.id;
   }
   ```

2. **Environment Variables**: Check environment variables inside route handlers, not at module load time:
   ```typescript
   // ✅ Correct
   export async function POST(request: NextRequest) {
     const secret = process.env.SECRET_KEY;
     if (!secret) return Response.json({ error: 'Not configured' }, { status: 500 });
   }

   // ❌ Wrong - throws at build time
   const secret = process.env.SECRET_KEY;
   if (!secret) throw new Error('Missing SECRET_KEY');
   ```

3. **Client Components**: Pages using motion/animations must have `'use client'` directive.

## Testing Guidelines
- Tests use Vitest 4.0.18 with Node environment.
- Test files: `src/**/*.test.ts` (excluded from TypeScript compilation).
- Globals enabled for `describe`, `it`, `expect`.
- Run specific tests: `vitest run src/lib/auth.test.ts`.
- Current tests: `src/lib/auth.test.ts` for authentication utilities.

## Commit & Pull Request Guidelines
Use Conventional Commit style for clarity:
- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for code refactoring
- `style:` for formatting changes
- `docs:` for documentation updates
- `chore:` for maintenance tasks
- `test:` for test additions/updates

For PRs, include:
- A short description of changes and motivation.
- Linked issue or task (if available).
- Screenshots or clips for UI changes.

All commits should include:
```
Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

## Security & Configuration Tips
Environment variables are required (see `README.md` for full list). Never commit secrets. Use `.env.local` for local development and configure the same variables in your hosting provider.

Key environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`: Admin authentication
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`: Payment processing
- `NEXT_PUBLIC_EMAILJS_*`: Contact form integration

The admin panel is at `/admin`, with login at `/admin/login`. Admin routes are protected by middleware with JWT verification.

## Motion/Animation Strategy
The project uses a motion shim (`src/lib/motion-shim.tsx`) instead of Framer Motion directly:
- Strips all Framer Motion props for SSR compatibility
- Compatible with React 19
- Import from `@/lib/motion-shim`, not `framer-motion`
- Pages using motion must be client components

## Database
- Prisma 6.19.2 (not 7.x - breaking changes in v7)
- Always run `npx prisma generate` after schema changes
- Run `npx prisma migrate dev` to create and apply migrations
- Migrations stored in `prisma/migrations/`

## Deployment
- Optimized for Vercel deployment
- Build uses Turbopack for faster compilation
- All 37 routes successfully generate during build
- Zero security vulnerabilities in dependencies (as of March 2026)
