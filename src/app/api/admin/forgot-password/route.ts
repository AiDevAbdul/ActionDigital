import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import db from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/email';

const schema = z.object({ email: z.string().email() });

export async function POST(request: NextRequest) {
  try {
    const { email } = schema.parse(await request.json());

    const user = await db.user.findUnique({ where: { email } });

    // Always return success — never reveal whether an email is registered
    if (!user) {
      return Response.json({ success: true });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.user.update({
      where: { email },
      data: { resetToken: hashedToken, resetTokenExpiry: expiry },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    await sendPasswordResetEmail(email, `${baseUrl}/admin/reset-password?token=${rawToken}`);

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }
    console.error('Forgot password error:', error);
    return Response.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
