// src/app/api/lms/modules/[id]/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  position: z.number().int().min(1).optional(),
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
    const moduleRecord = await db.module.findUnique({
      where: { id },
      include: { lessons: { orderBy: { position: 'asc' } } },
    });

    if (!moduleRecord) {
      return Response.json({ error: 'Module not found' }, { status: 404 });
    }

    return Response.json(moduleRecord);
  } catch (error) {
    console.error('Error fetching module:', error);
    return Response.json({ error: 'Failed to fetch module' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const payload = updateSchema.parse(await request.json());
    const moduleRecord = await db.module.update({
      where: { id },
      data: payload,
    });
    return Response.json(moduleRecord);
  } catch (error) {
    console.error('Error updating module:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid module payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to update module' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.module.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting module:', error);
    return Response.json({ error: 'Failed to delete module' }, { status: 500 });
  }
}
