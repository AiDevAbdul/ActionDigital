// src/app/api/lms/certificates/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const certSchema = z.object({
  userId: z.string().min(1),
  courseId: z.string().min(1),
  html: z.string().min(10),
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
  const courseId = request.nextUrl.searchParams.get('courseId');

  try {
    const certificates = await db.certificate.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(courseId ? { courseId } : {}),
      },
      include: {
        user: true,
        course: true,
      },
      orderBy: { issuedAt: 'desc' },
    });
    return Response.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return Response.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = certSchema.parse(await request.json());
    const certificate = await db.certificate.create({
      data: payload,
    });
    return Response.json(certificate);
  } catch (error) {
    console.error('Error creating certificate:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid certificate payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to create certificate' }, { status: 500 });
  }
}
