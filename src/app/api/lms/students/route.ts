// src/app/api/lms/students/route.ts
import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const requireAdmin = async (request: NextRequest) => {
  const token = request.cookies.get(getAdminCookieName())?.value;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) return false;
  const payload = await verifyAdminToken(token, secret);
  return Boolean(payload);
};

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const students = await db.user.findMany({
      where: { role: 'STUDENT' },
      select: { id: true, name: true, email: true },
      orderBy: { createdAt: 'desc' },
    });
    return Response.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return Response.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}
