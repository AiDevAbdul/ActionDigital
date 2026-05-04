import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyAdminToken, getAdminCookieName } from '@/lib/auth';

export async function GET(_request: NextRequest) {
  try {
    const secret = process.env.ADMIN_JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get(getAdminCookieName())?.value;
    const payload = token ? await verifyAdminToken(token, secret) : null;

    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const registrations = await prisma.sessionRegistration.findMany({
      orderBy: { registeredAt: 'desc' },
    });

    const headers = ['Name', 'Email', 'Phone', 'Experience', 'Registered At'];
    const rows = registrations.map((reg) => [
      reg.name,
      reg.email,
      reg.phone,
      reg.experience,
      new Date(reg.registeredAt).toISOString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="session-registrations-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export registrations' }, { status: 500 });
  }
}
