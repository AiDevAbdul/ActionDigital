// src/app/api/lms/courses/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const courseSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  accessType: z.enum(['FREE', 'PAID', 'SUBSCRIPTION']).default('FREE'),
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

export async function GET() {
  try {
    const courses = await db.course.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        instructors: {
          include: { user: true },
        },
      },
    });
    return Response.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return Response.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = courseSchema.parse(await request.json());
    const course = await db.course.create({
      data: payload,
    });
    return Response.json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid course payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
