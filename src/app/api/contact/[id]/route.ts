import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyAdminToken, getAdminCookieName } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });

  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminCookieName())?.value;
  const payload = token ? await verifyAdminToken(token, secret) : null;
  if (!payload) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const { id } = await params;
  const { read } = await request.json() as { read: boolean };

  try {
    const updated = await prisma.contactMessage.update({ where: { id }, data: { read } });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }
}
