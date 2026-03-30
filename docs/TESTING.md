# Testing

## Test Setup

- **Framework**: Vitest 4.0.18
- **Environment**: Node
- **Test Files**: `src/**/*.test.ts` (excluded from TypeScript compilation)
- **Globals**: `describe`, `it`, `expect` enabled in `vitest.config.ts`

## Running Tests

```bash
# Run all tests
npm run test

# Run specific test file
vitest run src/lib/auth.test.ts

# Run tests in watch mode
npm run test -- --watch
```

## Current Tests

- `src/lib/auth.test.ts` - Authentication utilities testing

## Writing Tests

Test files should follow the naming convention `*.test.ts` or `*.test.tsx`. Example:

```typescript
import { describe, it, expect } from 'vitest';
import { createToken, verifyToken } from '@/lib/auth';

describe('Auth', () => {
  it('should create and verify token', () => {
    const token = createToken({ email: 'test@example.com' });
    const verified = verifyToken(token);
    expect(verified.email).toBe('test@example.com');
  });
});
```

## TypeScript Configuration

Test files are excluded from main TypeScript compilation to avoid type conflicts:
- `tsconfig.json` excludes `**/*.test.ts` and `**/*.test.tsx`
- Vitest types are only available in test files
- Main application code remains strictly typed

## Best Practices

- Keep tests focused and isolated
- Use descriptive test names
- Mock external dependencies
- Test both success and error cases
- Aim for high coverage on critical paths (auth, payments, etc.)
