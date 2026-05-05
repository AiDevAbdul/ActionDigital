import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';
import { z } from 'zod';

const blogUpdateSchema = z.object({
  slug: z.string().trim().min(1).regex(/^[a-z0-9-]+$/).optional(),
  title: z.string().trim().min(3).optional(),
  excerpt: z.string().trim().min(10).optional(),
  content: z.string().trim().min(1).optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
  iconName: z.string().trim().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
  publishedAt: z.string().datetime().optional().nullable(),
});

const requireAdmin = async (request: NextRequest) => {
  const token = request.cookies.get(getAdminCookieName())?.value;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) return false;
  return Boolean(await verifyAdminToken(token, secret));
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  try {
    const post = await db.blogPost.findUnique({ where: { id } });
    if (!post) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return Response.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  try {
    const body = await request.json();
    const data = blogUpdateSchema.parse(body);
    const updateData: Record<string, unknown> = { ...data };
    if (data.status === 'PUBLISHED' && !data.publishedAt) {
      updateData.publishedAt = new Date();
    }
    const post = await db.blogPost.update({ where: { id }, data: updateData });
    return Response.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    console.error('Error updating blog post:', error);
    return Response.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  try {
    await db.blogPost.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return Response.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
