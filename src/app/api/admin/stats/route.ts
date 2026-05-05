import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAdminCookieName, verifyAdminToken } from '@/lib/auth';

const requireAdmin = async (request: NextRequest) => {
  const token = request.cookies.get(getAdminCookieName())?.value;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) return false;
  return Boolean(await verifyAdminToken(token, secret));
};

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const [
      projects,
      blogs,
      courses,
      students,
      unreadMessages,
      totalMessages,
      sessionRegistrations,
      partners,
      testimonials,
      enrollments,
      recentMessages,
      recentBlogs,
      recentProjects,
    ] = await Promise.all([
      db.project.count(),
      db.blogPost.count(),
      db.course.count(),
      db.user.count({ where: { role: 'STUDENT' } }),
      db.contactMessage.count({ where: { read: false } }),
      db.contactMessage.count(),
      db.sessionRegistration.count(),
      db.partner.count(),
      db.clientFeedback.count(),
      db.enrollment.count(),
      db.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, name: true, subject: true, createdAt: true, read: true } }),
      db.blogPost.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, title: true, status: true, createdAt: true } }),
      db.project.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, title: true, createdAt: true } }),
    ]);

    return Response.json({
      stats: {
        projects,
        blogs,
        courses,
        students,
        unreadMessages,
        totalMessages,
        sessionRegistrations,
        partners,
        testimonials,
        enrollments,
      },
      recent: {
        messages: recentMessages,
        blogs: recentBlogs,
        projects: recentProjects,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
