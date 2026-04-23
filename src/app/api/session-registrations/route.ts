import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, experience } = body;

    // Validation
    if (!name || !email || !phone || !experience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create registration
    const registration = await prisma.sessionRegistration.create({
      data: {
        name,
        email,
        phone,
        experience,
      },
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error('Session registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register for session' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await prisma.sessionRegistration.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching registration count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch count' },
      { status: 500 }
    );
  }
}
