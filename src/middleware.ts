import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  
  // 1. Enforce 301 www -> non-www redirect
  if (host.startsWith('www.')) {
    const newUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, 'https://adsverse.in');
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  const pathname = request.nextUrl.pathname;
  
  // 2. i18n redirects (existing)
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const newPath = pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(new URL(newPath, request.url), { status: 301 });
  }
  if (pathname.startsWith('/hi/') || pathname === '/hi') {
    const newPath = pathname.replace(/^\/hi/, '') || '/';
    return NextResponse.redirect(new URL(newPath, request.url), { status: 301 });
  }

  // 3. Admin protection
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. Prevent logged-in users from accessing /login again
  if (pathname === '/login' || pathname === '/signup') {
    const adminToken = request.cookies.get('admin_token')?.value;
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    const userToken = request.cookies.get('user_token')?.value;
    if (userToken) {
      const returnUrl = request.nextUrl.searchParams.get('returnUrl');
      // An authenticated user opening /admin must be allowed to reach the
      // admin login mode. The page verifies their Firebase role and creates
      // the admin session cookie when appropriate. Redirecting them straight
      // back to /admin here creates a /admin <-> /login loop because that
      // cookie has not been issued yet.
      if (returnUrl?.startsWith('/admin')) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL(returnUrl || '/tools/seo-audit', request.url));
    }
  }

  // 5. Block /get-id from public access
  if (pathname === '/get-id') {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnUrl', '/get-id');
      return NextResponse.redirect(loginUrl);
    }
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
