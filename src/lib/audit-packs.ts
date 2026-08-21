export const AUDIT_PACKS: Record<string, { name: string; priceInr: number; paise: number; credits: number; usdEquiv: string }> = {
  single: {
    name: '1 Website Detailed Audit Pass',
    priceInr: 10,
    paise: 1000,
    credits: 1,
    usdEquiv: '$0.12',
  },
  wallet_5: {
    name: 'Starter Wallet Pack (5 Audits)',
    priceInr: 50,
    paise: 5000,
    credits: 5,
    usdEquiv: '$0.60',
  },
  wallet_12: {
    name: 'Agency Pro Wallet Pack (12 Audits)',
    priceInr: 100,
    paise: 10000,
    credits: 12,
    usdEquiv: '$1.20',
  },
};
