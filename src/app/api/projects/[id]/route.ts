// src/app/api/projects/[id]/route.ts
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await db.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }

    return Response.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return Response.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = projectSchema.parse(await request.json());
    const { title, description, tech, link, icon } = payload;

    const project = await db.project.update({
      where: { id: params.id },
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
    console.error('Error updating project:', error);
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid project payload' }, { status: 400 });
    }
    return Response.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await db.project.delete({
      where: { id: params.id },
    });

    return Response.json({ message: 'Project deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete project';
    console.error('Error deleting project:', error);
    return Response.json({ error: message }, { status: 500 });
  }
}
