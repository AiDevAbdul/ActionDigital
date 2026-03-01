/// <reference types="vitest" />
import { createAdminToken, verifyAdminToken } from './auth';

describe('auth tokens', () => {
  it('creates and verifies a token', async () => {
    const secret = 'test-secret';
    const token = await createAdminToken('admin@example.com', secret, 60);
    const payload = await verifyAdminToken(token, secret);
    expect(payload?.sub).toBe('admin@example.com');
  });

  it('rejects an invalid token', async () => {
    const secret = 'test-secret';
    const token = await createAdminToken('admin@example.com', secret, 1);
    const payload = await verifyAdminToken(`${token}x`, secret);
    expect(payload).toBeNull();
  });
});
