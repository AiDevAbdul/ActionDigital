// src/app/api/lms/modules/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const moduleSchema = z.object({
  courseId: z.string().min(1),
  title: z.string().min(3),
  description: z.string().optional(),
  position: z.number().int().min(1),
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
    const payload = moduleSchema.parse(await request.json());
    const moduleRecord = await db.module.create({
      data: payload,
    });
    return Response.json(moduleRecord);
  } catch (error) {
    console.error('Error creating module:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid module payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to create module' }, { status: 500 });
  }
}
