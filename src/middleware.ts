import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from './i18n-config';


function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  try {
    return match(languages, i18n.locales, i18n.defaultLocale);
  } catch (e) {
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Skip middleware for static assets, SEO files, and API
  const isProtectedPath = 
    [
      '/manifest.json',
      '/favicon.ico',
      '/favicon-16x16.png',
      '/favicon-32x32.png',
      '/apple-touch-icon.png',
      '/robots.txt',
      '/sitemap.xml',
      '/site.webmanifest',
    ].includes(pathname) ||
    pathname.includes('/images/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/');

  if (isProtectedPath) return;

  // 2. Check if pathname is missing a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 3. Handle paths missing a locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // If it's the default locale and we're at the root, REWRITE to avoid redirect penalty
    if (locale === i18n.defaultLocale && pathname === '/') {
      return NextResponse.rewrite(new URL(`/${i18n.defaultLocale}`, request.url));
    }

    // Otherwise, redirect permanently (301) to the locale-prefixed version
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      ),
      { status: 301 } // Permanent redirect
    );
  }

  // 4. Redirect default locale prefix back to root to avoid duplicate content
  // e.g., /en -> /
  if (pathname === `/${i18n.defaultLocale}` || pathname === `/${i18n.defaultLocale}/`) {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url, { status: 301 });
  }
}

export const config = {
  // Use a more inclusive matcher, logic inside middleware handles exclusions
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
