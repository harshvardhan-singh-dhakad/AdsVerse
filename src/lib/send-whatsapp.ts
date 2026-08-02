// Send a WhatsApp Utility Template message via Meta Cloud API
// Template must be pre-approved in Meta Business Manager as a UTILITY template.
// Template name: adsverse_weekly_report
// Template body (strictly informational):
// "Your weekly SEO/GEO/AEO report for {{1}} is ready — score: {{2}}/100 ({{3}} vs last week). View it here: {{4}}"

interface WhatsAppReportParams {
  phoneNumber: string; // E.164 format e.g. +919876543210
  siteUrl: string;
  overallScore: number;
  trendLabel: string; // e.g. "▲ +5" or "▼ -3"
  dashboardUrl: string;
}

export async function sendWeeklyWhatsApp(params: WhatsAppReportParams) {
  const { phoneNumber, siteUrl, overallScore, trendLabel, dashboardUrl } = params;
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME || 'adsverse_weekly_report';

  if (!token || !phoneId) {
    console.warn('[WhatsApp] WHATSAPP_TOKEN or WHATSAPP_PHONE_ID not configured. Skipping.');
    return;
  }

  const hostname = (() => { try { return new URL(siteUrl).hostname; } catch { return siteUrl; } })();

  const payload = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'template',
    template: {
      name: templateName,
      language: { code: 'en' },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: hostname },
            { type: 'text', text: String(overallScore) },
            { type: 'text', text: trendLabel },
            { type: 'text', text: dashboardUrl },
          ],
        },
      ],
    },
  };

  const res = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error('[WhatsApp] Failed to send message:', errBody);
  } else {
    console.log(`[WhatsApp] Sent report notification to ${phoneNumber}`);
  }
}
