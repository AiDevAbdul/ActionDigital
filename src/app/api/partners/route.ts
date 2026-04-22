import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';
import { z } from 'zod';

const partnerSchema = z.object({
  name: z.string().trim().min(1),
  logo: z.string().trim().min(1),
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
    const partners = await db.partner.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return Response.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return Response.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = partnerSchema.parse(await request.json());
    const { name, logo } = payload;

    const partner = await db.partner.create({
      data: {
        name,
        logo,
      },
    });

    return Response.json(partner);
  } catch (error) {
    console.error('Error creating partner:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid partner payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}
