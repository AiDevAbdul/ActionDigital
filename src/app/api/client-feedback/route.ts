import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';
import { z } from 'zod';

const feedbackSchema = z.object({
  name: z.string().trim().min(1),
  company: z.string().trim().min(1),
  feedback: z.string().trim().min(10),
  rating: z.number().int().min(1).max(5).default(5),
  avatar: z.string().optional(),
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
    const feedback = await db.clientFeedback.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return Response.json(feedback);
  } catch (error) {
    console.error('Error fetching client feedback:', error);
    return Response.json({ error: 'Failed to fetch client feedback' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = feedbackSchema.parse(await request.json());
    const { name, company, feedback, rating, avatar } = payload;

    const clientFeedback = await db.clientFeedback.create({
      data: {
        name,
        company,
        feedback,
        rating,
        avatar,
      },
    });

    return Response.json(clientFeedback);
  } catch (error) {
    console.error('Error creating client feedback:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid feedback payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to create client feedback' }, { status: 500 });
  }
}
