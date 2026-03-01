// src/app/api/lms/enrollments/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const enrollmentSchema = z.object({
  userId: z.string().min(1),
  courseId: z.string().min(1),
});

const requireAdmin = async (request: NextRequest) => {
  const token = request.cookies.get(getAdminCookieName())?.value;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) return false;
  const payload = await verifyAdminToken(token, secret);
  return Boolean(payload);
};

export async function GET(request: NextRequest) {
  const courseId = request.nextUrl.searchParams.get('courseId');
  const userId = request.nextUrl.searchParams.get('userId');

  try {
    const enrollments = await db.enrollment.findMany({
      where: {
        ...(courseId ? { courseId } : {}),
        ...(userId ? { userId } : {}),
      },
      include: {
        course: true,
        user: true,
      },
      orderBy: { enrolledAt: 'desc' },
    });
    return Response.json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return Response.json({ error: 'Failed to fetch enrollments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = enrollmentSchema.parse(await request.json());
    const enrollment = await db.enrollment.create({
      data: payload,
    });
    return Response.json(enrollment);
  } catch (error) {
    console.error('Error creating enrollment:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid enrollment payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to create enrollment' }, { status: 500 });
  }
}
