import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('adi_admin')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all registrations
    const registrations = await prisma.sessionRegistration.findMany({
      orderBy: { registeredAt: 'desc' },
    });

    // Create CSV content
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
    return NextResponse.json(
      { error: 'Failed to export registrations' },
      { status: 500 }
    );
  }
}
