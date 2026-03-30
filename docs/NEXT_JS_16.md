# Next.js 16 Breaking Changes

**IMPORTANT**: Next.js 16 introduced breaking changes that affect API routes and configuration.

## Dynamic Route Params are now Promises

All API routes with dynamic segments must use `Promise<{ id: string }>` instead of `{ id: string }`.

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

## Environment Variables in API Routes

Avoid checking environment variables at module load time. Check them inside the route handler to prevent build-time errors.

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

## Client Components

Pages using motion/animations must have `'use client'` directive for proper hydration.

## TypeScript Configuration

- **jsx**: Set to `react-jsx` (React automatic runtime, required by Next.js 16)
- **types**: Only includes `node` (vitest types excluded from main compilation)
- **exclude**: Test files (`**/*.test.ts`, `**/*.test.tsx`) are excluded
- **include**: Includes `.next/dev/types/**/*.ts` for Next.js type generation
