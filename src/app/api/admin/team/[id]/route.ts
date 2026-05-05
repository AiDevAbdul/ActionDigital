import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';
import { z } from 'zod';

const teamUpdateSchema = z.object({
  name: z.string().trim().min(1).optional(),
  role: z.string().trim().min(1).optional(),
  bio: z.string().trim().optional().nullable(),
  avatar: z.string().trim().optional().nullable(),
  linkedIn: z.string().trim().url().optional().nullable(),
  twitter: z.string().trim().optional().nullable(),
  position: z.number().int().optional(),
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
    const data = teamUpdateSchema.parse(await request.json());
    const member = await db.teamMember.update({ where: { id }, data });
    return Response.json(member);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    console.error('Error updating team member:', error);
    return Response.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  try {
    await db.teamMember.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return Response.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
