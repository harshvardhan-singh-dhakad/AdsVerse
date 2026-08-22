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
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 4. Prevent logged-in users from accessing /login again
  if (pathname === '/login') {
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // 5. Block /get-id from public access
  if (pathname === '/get-id') {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, svg, robots.txt, sitemap.xml, llms.txt)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
