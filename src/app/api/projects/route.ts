// src/app/api/projects/route.ts
import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim().min(10),
  tech: z.preprocess(
    (value) => {
      if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean);
      }
      if (typeof value === 'string') {
        return value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);
      }
      return [];
    },
    z.array(z.string().min(1)).default([])
  ),
  link: z.preprocess(
    (value) => (typeof value === 'string' && value.trim() ? value.trim() : null),
    z.string().url().nullable().optional()
  ),
  icon: z.preprocess(
    (value) => (typeof value === 'string' && value.trim() ? value.trim() : undefined),
    z.string().min(1).optional()
  ),
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
    const projects = await db.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return Response.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = projectSchema.parse(await request.json());
    const { title, description, tech, link, icon } = payload;

    const project = await db.project.create({
      data: {
        title,
        description,
        tech,
        link,
        icon,
      },
    });

    return Response.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid project payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
