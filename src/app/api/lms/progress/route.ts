// src/app/api/lms/progress/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const progressSchema = z.object({
  userId: z.string().min(1),
  lessonId: z.string().min(1),
  progress: z.number().min(0).max(1).optional(),
  completed: z.boolean().optional(),
});

const requireAdmin = async (request: NextRequest) => {
  const token = request.cookies.get(getAdminCookieName())?.value;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) return false;
  const payload = await verifyAdminToken(token, secret);
  return Boolean(payload);
};

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const lessonId = request.nextUrl.searchParams.get('lessonId');

  try {
    const progress = await db.lessonProgress.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(lessonId ? { lessonId } : {}),
      },
      include: {
        lesson: true,
        user: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
    return Response.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return Response.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = progressSchema.parse(await request.json());
    const existing = await db.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: payload.userId,
          lessonId: payload.lessonId,
        },
      },
    });

    const progress = existing
      ? await db.lessonProgress.update({
          where: { id: existing.id },
          data: {
            progress: payload.progress ?? existing.progress,
            completed: payload.completed ?? existing.completed,
          },
        })
      : await db.lessonProgress.create({
          data: {
            userId: payload.userId,
            lessonId: payload.lessonId,
            progress: payload.progress ?? 0,
            completed: payload.completed ?? false,
          },
        });

    return Response.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid progress payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
