import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import db from '@/lib/db';

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const { token, password } = schema.parse(await request.json());

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await db.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      return Response.json({ error: 'Invalid or expired reset link. Please request a new one.' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.issues[0]?.message || 'Invalid request' }, { status: 400 });
    }
    console.error('Reset password error:', error);
    return Response.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}
