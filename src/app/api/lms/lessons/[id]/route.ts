// src/app/api/lms/lessons/[id]/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  type: z.enum(['VIDEO', 'TEXT', 'PDF', 'QUIZ', 'ASSIGNMENT']).optional(),
  content: z.string().optional(),
  videoUrl: z.string().url().optional(),
  pdfUrl: z.string().url().optional(),
  position: z.number().int().min(1).optional(),
  releaseAt: z.string().datetime().optional(),
  isFree: z.boolean().optional(),
});

const requireAdmin = async (request: NextRequest) => {
  const token = request.cookies.get(getAdminCookieName())?.value;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) return false;
  const payload = await verifyAdminToken(token, secret);
  return Boolean(payload);
};

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const lesson = await db.lesson.findUnique({
      where: { id },
    });

    if (!lesson) {
      return Response.json({ error: 'Lesson not found' }, { status: 404 });
    }

    return Response.json(lesson);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return Response.json({ error: 'Failed to fetch lesson' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const payload = updateSchema.parse(await request.json());
    const lesson = await db.lesson.update({
      where: { id },
      data: {
        ...payload,
        releaseAt: payload.releaseAt ? new Date(payload.releaseAt) : undefined,
      },
    });
    return Response.json(lesson);
  } catch (error) {
    console.error('Error updating lesson:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid lesson payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to update lesson' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.lesson.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    return Response.json({ error: 'Failed to delete lesson' }, { status: 500 });
  }
}
