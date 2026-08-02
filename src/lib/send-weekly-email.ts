import nodemailer from 'nodemailer';

interface WeeklyReportEmailParams {
  to: string;
  displayName: string;
  siteUrl: string;
  scores: { seo: number; geo: number; aeo: number };
  trendDelta: { seo: number; geo: number; aeo: number };
  dashboardUrl: string;
}

function delta(n: number) {
  if (n === 0) return `<span style="color:#94a3b8">→ 0</span>`;
  return n > 0
    ? `<span style="color:#22c55e">▲ +${n}</span>`
    : `<span style="color:#ef4444">▼ ${n}</span>`;
}

export async function sendWeeklyReportEmail(params: WeeklyReportEmailParams) {
  const { to, displayName, siteUrl, scores, trendDelta, dashboardUrl } = params;
  const hostname = (() => { try { return new URL(siteUrl).hostname; } catch { return siteUrl; } })();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: `"AdsVerse SEO Reports" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Weekly SEO Report — ${hostname} (Score: ${scores.seo}/100)`,
    html: `
<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0f0f1a;color:#e2e8f0;padding:32px;border-radius:12px;">
  <h2 style="color:#a855f7;margin-bottom:4px;">📊 Weekly Report — ${hostname}</h2>
  <p style="color:#64748b;font-size:13px;margin-top:0;">Hi ${displayName}, your automated weekly audit is ready.</p>
  <table style="width:100%;border-collapse:collapse;margin:24px 0;">
    <thead><tr><th style="text-align:left;color:#64748b;font-size:11px;padding:8px 0;border-bottom:1px solid #1e293b;">Metric</th><th style="text-align:right;color:#64748b;font-size:11px;padding:8px 0;border-bottom:1px solid #1e293b;">Score</th><th style="text-align:right;color:#64748b;font-size:11px;padding:8px 0;border-bottom:1px solid #1e293b;">vs Last Week</th></tr></thead>
    <tbody>
      <tr><td style="padding:10px 0;font-size:14px;">SEO</td><td style="text-align:right;font-weight:bold;">${scores.seo}/100</td><td style="text-align:right;">${delta(trendDelta.seo)}</td></tr>
      <tr><td style="padding:10px 0;font-size:14px;">GEO</td><td style="text-align:right;font-weight:bold;">${scores.geo}/100</td><td style="text-align:right;">${delta(trendDelta.geo)}</td></tr>
      <tr><td style="padding:10px 0;font-size:14px;">AEO</td><td style="text-align:right;font-weight:bold;">${scores.aeo}/100</td><td style="text-align:right;">${delta(trendDelta.aeo)}</td></tr>
    </tbody>
  </table>
  <a href="${dashboardUrl}" style="display:inline-block;background:#a855f7;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">View Full Report →</a>
  <p style="color:#334155;font-size:11px;margin-top:24px;">AdsVerse · adsverse.in · Indore, India</p>
</div>`,
  });
}
