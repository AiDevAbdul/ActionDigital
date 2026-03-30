# Authentication

## Admin Authentication

- **Implementation**: Custom JWT in `src/lib/auth.ts` using Web Crypto API (no external JWT library)
- **Algorithm**: HMAC-SHA256 signing
- **Cookie Name**: `adi_admin` (defined in `getAdminCookieName()`)
- **Default Expiry**: 7 days (configurable via `expiresInSeconds` parameter)

## Credentials

Admin credentials are stored in environment variables:
- `ADMIN_EMAIL`: Admin email address
- `ADMIN_PASSWORD`: Admin password
- `ADMIN_JWT_SECRET`: Secret key for JWT signing

## Protected Routes

**Middleware** (`middleware.ts`) protects:
- All `/admin/*` routes except `/admin/login`
- Write operations (POST/PUT/PATCH/DELETE) to `/api/projects/*`

## Login Flow

1. User navigates to `/admin/login`
2. Submits credentials to `/api/admin/login`
3. Server validates credentials and generates JWT token
4. Token stored in `adi_admin` cookie
5. Middleware verifies token on subsequent requests

## Logout

POST to `/api/admin/logout` clears the `adi_admin` cookie.

## Testing

Auth utilities are tested in `src/lib/auth.test.ts`. Run with:
```bash
vitest run src/lib/auth.test.ts
```
