// src/app/api/lms/lessons/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const lessonSchema = z.object({
  moduleId: z.string().min(1),
  title: z.string().min(3),
  type: z.enum(['VIDEO', 'TEXT', 'PDF', 'QUIZ', 'ASSIGNMENT']).default('TEXT'),
  content: z.string().optional(),
  videoUrl: z.string().url().optional(),
  pdfUrl: z.string().url().optional(),
  position: z.number().int().min(1),
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

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = lessonSchema.parse(await request.json());
    const lesson = await db.lesson.create({
      data: {
        ...payload,
        releaseAt: payload.releaseAt ? new Date(payload.releaseAt) : undefined,
      },
    });
    return Response.json(lesson);
  } catch (error) {
    console.error('Error creating lesson:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid lesson payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to create lesson' }, { status: 500 });
  }
}
