# Architecture

## App Structure

The project uses Next.js App Router with the following structure:

- **`src/app/`**: Next.js pages and API routes
  - Public pages: `/`, `/about`, `/services`, `/projects`, `/blog`, `/courses`, `/contact`, `/pricing`, `/faq`, `/aidev`, `/events`
  - Admin pages: `/admin`, `/admin/login` (protected by middleware)
  - Dashboard: `/dashboard` (student LMS interface)
  - API routes: `/api/admin/*`, `/api/contact`, `/api/projects/*`, `/api/lms/*`, `/api/payments/*`

- **`src/components/`**: React components
  - Page components: `Hero`, `About`, `Services`, `ProjectsSection`, `CoursesSection`, etc.
  - Admin components: `ProjectForm`, `ProjectList` (in `admin/` subdirectory)
  - Blog components: `BlogPostContent` (in `blog/` subdirectory)
  - Shared: `Header`, `Footer`, `AnimatedPageWrapper`, `MotionSection`
  - **`ui/`**: Design-system primitives — `GlassCard`, `GlowButton`, `AmbientBlob`, `SectionHeading`, `BentoGrid`, `PillBadge`

- **`src/lib/`**: Utility libraries
  - `db.ts`: Prisma client singleton
  - `auth.ts`: Custom JWT implementation using Web Crypto API (no external JWT library)
  - `rateLimit.ts`: Rate limiting utilities
  - `site.ts`: Site configuration and metadata
  - `motion-shim.tsx`: Framer Motion shim that strips motion props (React 19 compatible)

- **`src/context/`**: React context providers
  - `ThemeProvider.tsx`: Dark/light theme management

## Path Aliases

TypeScript is configured with `@/*` alias mapping to `./src/*`. Always use this alias for imports:

```typescript
import Header from '@/components/Header';
import { db } from '@/lib/db';
```

## Coding Style

- TypeScript + React (TSX) with 2-space indentation and semicolons
- Prefer single quotes in TS/TSX
- Component files use `PascalCase.tsx`; hooks use `useThing.ts`
- Tailwind CSS v4 for styling; keep class lists readable
