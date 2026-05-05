import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';
import { z } from 'zod';

const feedbackUpdateSchema = z.object({
  name: z.string().trim().min(1).optional(),
  company: z.string().trim().min(1).optional(),
  feedback: z.string().trim().min(10).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  avatar: z.string().optional().nullable(),
});

const requireAdmin = async (request: NextRequest) => {
  const token = request.cookies.get(getAdminCookieName())?.value;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) return false;
  return Boolean(await verifyAdminToken(token, secret));
};

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  try {
    const data = feedbackUpdateSchema.parse(await request.json());
    const feedback = await db.clientFeedback.update({ where: { id }, data });
    return Response.json(feedback);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    console.error('Error updating feedback:', error);
    return Response.json({ error: 'Failed to update feedback' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  try {
    await db.clientFeedback.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return Response.json({ error: 'Failed to delete feedback' }, { status: 500 });
  }
}
