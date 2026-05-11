import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle /en and /hi redirects
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const newPath = pathname === '/en' ? '/' : pathname.replace('/en/', '/');
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  if (pathname === '/hi' || pathname.startsWith('/hi/')) {
    const newPath = pathname === '/hi' ? '/' : pathname.replace('/hi/', '/');
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/en/:path*', '/hi/:path*', '/en', '/hi'],
};
