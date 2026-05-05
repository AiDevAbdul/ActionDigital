import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';
import { z } from 'zod';

const teamSchema = z.object({
  name: z.string().trim().min(1),
  role: z.string().trim().min(1),
  bio: z.string().trim().optional().nullable(),
  avatar: z.string().trim().optional().nullable(),
  linkedIn: z.string().trim().url().optional().nullable(),
  twitter: z.string().trim().optional().nullable(),
  position: z.number().int().default(0),
});

const requireAdmin = async (request: NextRequest) => {
  const token = request.cookies.get(getAdminCookieName())?.value;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) return false;
  return Boolean(await verifyAdminToken(token, secret));
};

export async function GET() {
  try {
    const members = await db.teamMember.findMany({ orderBy: [{ position: 'asc' }, { createdAt: 'asc' }] });
    return Response.json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return Response.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = teamSchema.parse(await request.json());
    const member = await db.teamMember.create({ data });
    return Response.json(member, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    console.error('Error creating team member:', error);
    return Response.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
