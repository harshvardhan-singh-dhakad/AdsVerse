export interface SubscriptionPlanConfig {
  id: string;
  name: string;
  sitesLimit: number;
  priceInr: number;
  paise: number;
  description: string;
  features: string[];
  envKey: string;
}

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlanConfig> = {
  '1_site': {
    id: '1_site',
    name: '1 Website Plan',
    sitesLimit: 1,
    priceInr: 299,
    paise: 29900,
    description: 'Track 1 website with automated daily SEO and performance audits',
    features: [
      'Track 1 domain slot',
      'Daily automated scheduled audits',
      'PDF & Email Audit Reports',
      'Full GEO/AEO Citations analysis',
    ],
    envKey: 'RAZORPAY_PLAN_1_SITE',
  },
  '3_site': {
    id: '3_site',
    name: '3 Websites Plan',
    sitesLimit: 3,
    priceInr: 449,
    paise: 44900,
    description: 'Track up to 3 websites with automated daily SEO and performance audits',
    features: [
      'Track up to 3 domain slots',
      'Daily automated scheduled audits',
      'PDF & Email Audit Reports',
      'Competitor Radar & Rankings',
      'Full GEO/AEO Citations analysis',
    ],
    envKey: 'RAZORPAY_PLAN_3_SITE',
  },
  '5_site': {
    id: '5_site',
    name: '5 Websites Plan',
    sitesLimit: 5,
    priceInr: 599,
    paise: 59900,
    description: 'Track up to 5 websites with automated daily SEO and performance audits',
    features: [
      'Track up to 5 domain slots',
      'Daily automated scheduled audits',
      'PDF & Email Audit Reports',
      'Competitor Radar & Rankings',
      'Priority Audit queue',
    ],
    envKey: 'RAZORPAY_PLAN_5_SITE',
  },
  '10_site': {
    id: '10_site',
    name: '10 Websites Agency Plan',
    sitesLimit: 10,
    priceInr: 999,
    paise: 99900,
    description: 'Track up to 10 websites with automated daily SEO and performance audits',
    features: [
      'Track up to 10 domain slots',
      'Daily automated scheduled audits',
      'White-label PDF reports',
      'Multi-competitor benchmarking',
      'Dedicated email & WhatsApp support',
    ],
    envKey: 'RAZORPAY_PLAN_10_SITE',
  },
};

export const PLAN_LIMITS: Record<string, number> = Object.fromEntries(
  Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => [key, plan.sitesLimit])
);

export const PLAN_PRICES: Record<string, number> = Object.fromEntries(
  Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => [key, plan.priceInr])
);

export const PLAN_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => [key, `${plan.sitesLimit} Website${plan.sitesLimit > 1 ? 's' : ''} — ₹${plan.priceInr}/mo`])
);
