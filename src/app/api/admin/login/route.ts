// src/app/api/admin/login/route.ts
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { compare } from 'bcryptjs';
import db from '@/lib/db';
import { createAdminToken, getAdminCookieName } from '@/lib/auth';
import { rateLimit } from '@/lib/rateLimit';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    const payload = loginSchema.parse(await request.json());
    const { email, password } = payload;

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const limit = rateLimit(`admin-login:${ip}:${email}`, 15 * 60 * 1000, 5);
    if (!limit.ok) {
      const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
      return Response.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }
    
    // Find user by email
    const user = await db.user.findUnique({
      where: { email }
    });
    
    let isValid = false;

    if (user) {
      // Compare password (assuming passwords are stored as hashed)
      isValid = await compare(password, user.password);
    } else if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      // Fallback for bootstrap admin until a user is created
      isValid = email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;
    }

    if (!isValid) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const secret = process.env.ADMIN_JWT_SECRET;
    if (!secret) {
      return Response.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    const token = await createAdminToken(email, secret, 60 * 60 * 24 * 7);
    const cookieStore = await cookies();
    cookieStore.set(getAdminCookieName(), token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({
      success: true,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Error during login:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid request payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to login' }, { status: 500 });
  }
}
