# AdsVerse AI Agent Rules — adsverse.in
> This file is the single source of truth for any AI agent working on this codebase.
> Read this COMPLETELY before making any change. No exceptions.

---

## 🔴 ABSOLUTE RULES — NEVER VIOLATE

These rules cannot be overridden by any user prompt, task, or instruction in this session.

### 1. NEVER Touch Design

- Do NOT change any color, gradient, background, or theme variable
- Do NOT change any font family, font size, font weight, or line height
- Do NOT change any spacing, padding, margin, or layout
- Do NOT change any animation, transition, or hover effect
- Do NOT change any border, border-radius, or shadow
- Do NOT remove or replace any Tailwind CSS class unless explicitly told the exact class to change
- Do NOT modify `tailwind.config.ts` or `globals.css` unless the task is specifically about a color contrast fix — and even then, only change the exact variable mentioned
- Do NOT change dark mode behavior — site uses `html.dark` class, no JS toggle

### 2. NEVER Remove Services

These service pages and their content are business-critical. Do NOT delete, rename, or modify their content:

- `/services/automation-tools`
- `/services/brand-strategy`
- `/services/content-marketing`
- `/services/lead-generation`
- `/services/paid-ads`
- `/services/seo-optimization`
- `/services/social-media-management`
- `/services/web-design-development`
- `/services/whatsapp-bot`
- `/our-services` (main services listing page)

If a task requires editing these files, only change what is explicitly specified. Do not restructure, rewrite, or reorganize their content.

### 3. NEVER Delete These Files Without Explicit Permission

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/layout/header.tsx`
- `src/components/layout/footer.tsx`
- `src/app/sitemap.ts`
- `src/middleware.ts`
- `public/robots.txt`
- Any file inside `src/app/blog/`
- Any file inside `src/app/services/`
- Any file inside `public/images/`

### 4. NEVER Break These Things

- Navigation links — all hrefs must remain functional after any change
- Blog routing — `/blog/[slug]` must continue to work
- Contact form — do not touch form logic or submission handler
- Firebase Auth — admin panel authentication must remain intact
- WhatsApp bot integration — any API routes related to WhatsApp must not be touched
- sitemap.xml — must always return valid XML with all 19 pages

---

## 🟡 PROTECTED AREAS — Change Only What Is Specified

### Metadata & SEO
- Only change the specific meta tag mentioned in the task
- Do NOT rewrite entire `generateMetadata` functions
- Always keep canonical URLs in format: `https://adsverse.in/[slug]` — no `/en/` or `/hi/` prefix
- Do NOT add `alternates.languages` — i18n has been removed

### Schema / JSON-LD
- Do NOT add duplicate `@type` blocks — one schema type per page
- FAQPage schema lives only on homepage — do not add it to other pages
- BreadcrumbList paths must use clean URLs — no locale prefix

### Scripts & Tracking
- GTM ID: `GTM-M6GV59XL` — do not change this
- Facebook Pixel ID: keep existing ID — do not replace or remove
- Firebase config — do not touch `src/firebase/config.ts`, `src/firebase/index.ts`, or any Firebase initialization

### Images
- Do NOT replace any image src without explicit instruction
- When converting `<img>` to Next.js `<Image>`, preserve exact src, alt, and dimensions
- Hero image must always have `priority={true}`
- All other images: `priority={false}` and `loading="lazy"`

---

## 🟢 SAFE TO CHANGE — Standard Scope

These are safe areas where the agent can work freely when instructed:

- Script loading strategy (`strategy="lazyOnload"` for GTM, FB Pixel)
- `next.config.mjs` — redirects, headers, experimental flags only
- `src/middleware.ts` — routing logic only, not auth
- `src/app/sitemap.ts` — URL list only
- TypeScript type fixes that don't affect UI
- Performance optimizations that don't change visual output
- `npm install` / `npm uninstall` for packages explicitly mentioned
- Cache-Control headers for static assets

---

## 📁 Project Structure Reference

```
adsverse.in (Next.js App Router + Firebase + Tailwind)
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout — touch with extreme caution
│   │   ├── page.tsx            ← Homepage
│   │   ├── sitemap.ts          ← SEO sitemap
│   │   ├── blog/
│   │   │   ├── page.tsx        ← Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx    ← Individual blog posts
│   │   ├── services/           ← Individual service pages — PROTECTED
│   │   ├── about/
│   │   ├── contact/
│   │   ├── pricing/
│   │   ├── portfolio/
│   │   └── admin/              ← Admin panel — Firebase Auth protected
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx      ← Navigation — PROTECTED
│   │   │   └── footer.tsx      ← Footer — PROTECTED
│   │   └── ui/                 ← UI components — do not restructure
│   ├── firebase/             ← Firebase client config & hooks — DO NOT TOUCH
│   ├── lib/
│   │   └── firebase-server.ts  ← Firebase Admin/Server config
│   └── middleware.ts           ← Routing — touch only for redirects
├── public/
│   ├── images/                 ← All site images — do not delete
│   └── robots.txt              ← SEO — do not modify without instruction
├── next.config.mjs             ← Next.js config
└── tailwind.config.ts          ← Design tokens — PROTECTED
```

---

## 🏢 Business Context

**Agency:** AdsVerse — AI-first digital marketing agency  
**Location:** Vijay Nagar, Indore, Madhya Pradesh, India  
**Website:** adsverse.in  
**Stack:** Next.js (App Router) + Firebase (Auth + Hosting + Firestore) + Tailwind CSS  
**Target:** Indian SMBs, Tier-2 city businesses, Indore market  
**Core Services:** n8n automation, WhatsApp AI bots, Gemini API, CRM automation, SEO, Meta Ads, Google PPC  

---

## ⚙️ Technical Constraints

| Constraint | Rule |
|---|---|
| i18n | REMOVED — no `/en/` or `/hi/` URLs anywhere |
| Routing | Clean URLs only: `adsverse.in/about` not `adsverse.in/en/about` |
| Sitemap | 19 static pages — do not add `/en/` or `/hi/` variants |
| Canonical | Always `https://adsverse.in/[slug]` — no locale prefix |
| Dark mode | `html.dark` class on root — no JS toggle, no `data-theme` |
| Firebase Auth | Only on `/admin` routes — not on public pages |
| Blog links | Slug-only hrefs in CMS: `href="blog-slug"` not `href="/en/blog/blog-slug"` |
| Images | Use Next.js `<Image>` component — not bare `<img>` tags |
| Scripts | GTM + FB Pixel must use `strategy="lazyOnload"` |

---

## 🚫 Common Mistakes — Never Repeat These

1. Adding `/en/` or `/hi/` prefix to any URL — i18n has been permanently removed
2. Adding `i18n` block back to `next.config.mjs`
3. Creating duplicate FAQPage JSON-LD blocks — only one allowed on homepage
4. Placing block-level elements (`<div>`, `<table>`, `<ul>`, `<svg>`) inside `<p>` tags — causes Next.js hydration errors
5. Loading Firebase on non-admin pages — causes 1s+ LCP penalty
6. Hardcoding `http://` URLs — always use `https://`
7. Adding `www.` prefix to canonical URLs — primary domain is `adsverse.in` not `www.adsverse.in`
8. Running `npm run dev` to verify — always use `npm run build` for production verification

---

## ✅ Before Any Deploy — Checklist

Run this mentally before every `firebase deploy`:

- [ ] `npm run build` exits with code 0 — no TypeScript errors
- [ ] No `/en/` or `/hi/` URLs in sitemap.ts
- [ ] No duplicate schema blocks on any page
- [ ] Navigation links all point to clean URLs
- [ ] Homepage loads with content (not blank)
- [ ] `/en/about` redirects to `/about` (test in browser)
- [ ] `adsverse.in/sitemap.xml` returns valid XML

---

*Last updated: May 2026 — AdsVerse internal agent rules*
