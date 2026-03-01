# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 14 (App Router) TypeScript app. Key paths:
- `src/app` for routes, layouts, and server/client components.
- `src/components` for shared UI building blocks.
- `src/context` for React context providers (theme, etc.).
- `src/data` for static data used by pages/components.
- `src/lib` for helpers and reusable logic.
- `public` for static assets.
- `prisma` for database schema and Prisma config.

## Build, Test, and Development Commands
- `npm run dev` starts the Next.js dev server at `http://localhost:3000`.
- `npm run build` creates a production build.
- `npm run start` runs the production server from the build output.
- `npm run lint` runs Next.js lint rules.
- `npm run lint:check` runs ESLint on `.ts/.tsx` files.
- `npm run lint:fix` auto-fixes lintable issues where possible.
- `npx prisma generate` regenerates the Prisma client after schema changes.

## Coding Style & Naming Conventions
- TypeScript + React (TSX) with 2-space indentation and semicolons.
- Prefer single quotes in TS/TSX (matches existing files).
- Use the path alias `@/` (maps to `src/`) for imports.
- Component files use `PascalCase.tsx`; hooks use `useThing.ts`.
- Tailwind CSS v4 is used for styling; keep class lists readable.

## Testing Guidelines
There is no dedicated test framework configured in this repo. For now, validate changes with `npm run lint` and manual checks in `npm run dev`. If you add tests, document the framework and naming pattern in this file.

## Commit & Pull Request Guidelines
Recent history shows a mix of Conventional Commit prefixes (`feat:`, `fix:`, `refactor:`, `style:`) and sentence-style messages. Prefer Conventional Commit style for clarity.
For PRs, include:
- A short description of changes and motivation.
- Linked issue or task (if available).
- Screenshots or clips for UI changes.

## Security & Configuration Tips
Environment variables are required (see `.env.example`). Never commit secrets. Use `.env.local` for local development and configure the same variables in your hosting provider. The admin panel is at `/admin`, with login at `/admin/login`.
