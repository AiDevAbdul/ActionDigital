// src/app/api/lms/payments/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const paymentSchema = z.object({
  userId: z.string().min(1),
  courseId: z.string().min(1).optional(),
  amountCents: z.number().int().min(0),
  currency: z.string().length(3).optional().default('USD'),
  provider: z.enum(['STRIPE', 'LOCAL']),
  providerRef: z.string().optional(),
});

const requireAdmin = async (request: NextRequest) => {
  const token = request.cookies.get(getAdminCookieName())?.value;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) return false;
  const payload = await verifyAdminToken(token, secret);
  return Boolean(payload);
};

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = request.nextUrl.searchParams.get('userId');

  try {
    const payments = await db.payment.findMany({
      where: userId ? { userId } : undefined,
      include: {
        user: true,
        course: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return Response.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return Response.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = paymentSchema.parse(await request.json());
    const payment = await db.payment.create({ data: payload });
    return Response.json(payment);
  } catch (error) {
    console.error('Error creating payment:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid payment payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
