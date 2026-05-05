import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';
import { z } from 'zod';

const partnerUpdateSchema = z.object({
  name: z.string().trim().min(1).optional(),
  logo: z.string().trim().min(1).optional(),
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
    const data = partnerUpdateSchema.parse(await request.json());
    const partner = await db.partner.update({ where: { id }, data });
    return Response.json(partner);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    console.error('Error updating partner:', error);
    return Response.json({ error: 'Failed to update partner' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  try {
    await db.partner.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return Response.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
