// src/app/api/lms/courses/[id]/instructors/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const assignSchema = z.object({
  userId: z.string().min(1),
});

const requireAdmin = async (request: NextRequest) => {
  const token = request.cookies.get(getAdminCookieName())?.value;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) return false;
  const payload = await verifyAdminToken(token, secret);
  return Boolean(payload);
};

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = assignSchema.parse(await request.json());
    const record = await db.courseInstructor.create({
      data: {
        courseId: params.id,
        userId: payload.userId,
      },
    });
    return Response.json(record);
  } catch (error) {
    console.error('Error assigning instructor:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid instructor payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to assign instructor' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = assignSchema.parse(await request.json());
    await db.courseInstructor.deleteMany({
      where: {
        courseId: params.id,
        userId: payload.userId,
      },
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error removing instructor:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid instructor payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to remove instructor' }, { status: 500 });
  }
}
