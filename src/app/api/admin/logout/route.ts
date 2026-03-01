// src/app/api/admin/logout/route.ts
import { cookies } from 'next/headers';
import { getAdminCookieName } from '@/lib/auth';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(getAdminCookieName(), '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return Response.json({ success: true });
}
