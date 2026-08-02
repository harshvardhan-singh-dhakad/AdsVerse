/**
 * GA4 / GTM Analytics utility for the SEO Audit funnel.
 * All events go through the existing GTM-M6GV59XL container via dataLayer.
 *
 * Funnel: audit_started → audit_completed → paywall_viewed → payment_completed
 *         pdf_downloaded / report_shared (can happen after payment_completed)
 *
 * In GTM: create one GA4 Event tag listening to all custom events (or one per event),
 * trigger = "Custom Event" matching the event name patterns below.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function pushEvent(event: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/**
 * Fired when the user submits the audit URL form.
 * Maps to the very top of the funnel — counts intent.
 */
export function trackAuditStarted(url: string, userPlan: string): void {
  pushEvent({
    event: 'audit_started',
    audit_url: url,
    user_plan: userPlan,            // 'free' | 'paid' | 'subscriber'
  });
}

/**
 * Fired when the API returns successfully and the report is displayed.
 * Includes the three top-level scores so GA4 can slice drop-off by score range.
 */
export function trackAuditCompleted(params: {
  url: string;
  userPlan: string;
  seoScore: number;
  geoScore: number;
  aeoScore: number;
  grade: string;
}): void {
  pushEvent({
    event: 'audit_completed',
    audit_url: params.url,
    user_plan: params.userPlan,
    seo_score: params.seoScore,
    geo_score: params.geoScore,
    aeo_score: params.aeoScore,
    overall_grade: params.grade,
  });
}

/**
 * Fired when the paywall/blur overlay becomes visible to a free-tier user.
 * This is the critical drop-off point — compare against audit_completed
 * to see conversion pressure.
 */
export function trackPaywallViewed(url: string): void {
  pushEvent({
    event: 'paywall_viewed',
    audit_url: url,
  });
}

/**
 * Fired after a Razorpay subscription payment succeeds (client-side callback).
 * Note: also fire server-side via webhook for reliability, but this gives
 * immediate GTM attribution.
 */
export function trackPaymentCompleted(params: {
  plan: string;           // '1_site' | '3_site' | '5_site' | '10_site'
  value: number;          // plan price in INR e.g. 299
  currency?: string;      // default 'INR'
  razorpaySubscriptionId?: string;
}): void {
  pushEvent({
    event: 'payment_completed',
    plan_tier: params.plan,
    value: params.value,
    currency: params.currency ?? 'INR',
    razorpay_subscription_id: params.razorpaySubscriptionId ?? '',
  });
}

/**
 * Fired when the user clicks the "Download PDF" button.
 */
export function trackPdfDownloaded(url: string, userPlan: string): void {
  pushEvent({
    event: 'pdf_downloaded',
    audit_url: url,
    user_plan: userPlan,
  });
}

/**
 * Fired when the user copies the shareable report link or uses a share action.
 */
export function trackReportShared(url: string, method: 'copy_link' | 'email' | 'native'): void {
  pushEvent({
    event: 'report_shared',
    audit_url: url,
    share_method: method,
  });
}
