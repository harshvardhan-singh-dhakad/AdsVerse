import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // i18n redirects (existing)
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const newPath = pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(new URL(newPath, request.url), { status: 301 });
  }
  if (pathname.startsWith('/hi/') || pathname === '/hi') {
    const newPath = pathname.replace(/^\/hi/, '') || '/';
    return NextResponse.redirect(new URL(newPath, request.url), { status: 301 });
  }

  // Admin protection
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Prevent logged-in users from accessing /login again
  if (pathname === '/login') {
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Block /get-id from public access
  if (pathname === '/get-id') {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: [
    '/en',
    '/en/:path*',
    '/hi',
    '/hi/:path*',
    '/admin',
    '/admin/:path*',
    '/login',
    '/get-id',
  ],
};

