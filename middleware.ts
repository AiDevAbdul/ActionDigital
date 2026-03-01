import { NextRequest, NextResponse } from 'next/server';
import { getAdminCookieName, verifyAdminToken } from './src/lib/auth';

const isWriteMethod = (method: string) => ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

const isAdminRoute = (pathname: string) => pathname.startsWith('/admin') && pathname !== '/admin/login';

const isProtectedApiRoute = (pathname: string) => pathname.startsWith('/api/projects');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const needsAuth =
    isAdminRoute(pathname) || (isProtectedApiRoute(pathname) && isWriteMethod(request.method));

  if (!needsAuth) {
    return NextResponse.next();
  }

  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const token = request.cookies.get(getAdminCookieName())?.value;
  const payload = token ? await verifyAdminToken(token, secret) : null;

  if (!payload) {
    if (isAdminRoute(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/projects/:path*'],
};
