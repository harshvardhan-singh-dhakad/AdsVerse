import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { idToken, pdfBase64, reportUrl } = await req.json() as {
      idToken: string;
      pdfBase64: string;
      reportUrl: string;
    };

    if (!idToken || !pdfBase64 || !reportUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify token and get user email
    let userEmail: string;
    let displayName: string;
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      userEmail = decoded.email ?? '';
      displayName = decoded.name ?? 'there';
      if (!userEmail) throw new Error('No email in token');
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Build PDF buffer from base64
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const hostname = (() => {
      try { return new URL(reportUrl).hostname; } catch { return reportUrl; }
    })();

    await transporter.sendMail({
      from: `"AdsVerse SEO Tool" <${process.env.GMAIL_USER}>`,
      to: userEmail,
      subject: `Your SEO + GEO + AEO Audit Report — ${hostname}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f1a; color: #e2e8f0; padding: 32px; border-radius: 12px;">
          <h2 style="color: #a855f7; margin-bottom: 8px;">Your Audit Report is Ready 🎯</h2>
          <p style="color: #94a3b8; margin-bottom: 24px;">Hi ${displayName}! Your SEO + GEO + AEO audit for <strong style="color: #fff;">${hostname}</strong> is attached below.</p>

          <div style="background: #1e1e2e; border: 1px solid #2d2d44; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 13px; color: #64748b;">Audited URL</p>
            <p style="margin: 4px 0 0; color: #a855f7; word-break: break-all;">${reportUrl}</p>
          </div>

          <p style="color: #94a3b8; font-size: 14px;">The full PDF report is attached to this email. It includes:</p>
          <ul style="color: #94a3b8; font-size: 14px; padding-left: 20px;">
            <li>Overall SEO Score & Grade</li>
            <li>On-Page, Technical, Performance, Accessibility & Security checks</li>
            <li>GEO (AI Search Readiness) Score</li>
            <li>AEO (Answer Engine Optimization) Score</li>
            <li>Actionable fixes for all failed checks</li>
          </ul>

          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #2d2d44; text-align: center;">
            <p style="color: #475569; font-size: 12px; margin: 0;">
              Need help implementing these fixes? 
              <a href="https://adsverse.in/contact" style="color: #a855f7;">Talk to an AdsVerse SEO Expert →</a>
            </p>
            <p style="color: #334155; font-size: 11px; margin-top: 8px;">AdsVerse · adsverse.in · Indore, India</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `SEO_Audit_${hostname}_${new Date().toISOString().split('T')[0]}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[/api/audit/email-report] Error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
