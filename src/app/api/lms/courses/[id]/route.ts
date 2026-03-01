// src/app/api/lms/courses/[id]/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  accessType: z.enum(['FREE', 'PAID', 'SUBSCRIPTION']).optional(),
  priceCents: z.number().int().positive().optional(),
  currency: z.string().min(3).max(3).optional(),
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
    const course = await db.course.findUnique({
      where: { id },
      include: {
        modules: {
          orderBy: { position: 'asc' },
          include: { lessons: { orderBy: { position: 'asc' } } },
        },
        instructors: { include: { user: true } },
      },
    });

    if (!course) {
      return Response.json({ error: 'Course not found' }, { status: 404 });
    }

    return Response.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return Response.json({ error: 'Failed to fetch course' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const payload = updateSchema.parse(await request.json());
    const course = await db.course.update({
      where: { id },
      data: payload,
    });
    return Response.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid course payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.course.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return Response.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
