import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/firebase/admin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(authorization.slice(7));
    const [profile, payments] = await Promise.all([
      adminDb.collection('audit_users').doc(decoded.uid).get(),
      adminDb.collection('audit_payments')
        .where('userId', '==', decoded.uid)
        .limit(50)
        .get(),
    ]);

    return NextResponse.json({
      credits: Number(profile.data()?.paidCredits || 0),
      payments: payments.docs.map((payment) => {
        const data = payment.data();
        return {
          id: payment.id,
          credits: Number(data.credits || 0),
          amount: Number(data.amount || 0),
          packType: String(data.packType || 'audit_credit'),
          status: String(data.status || 'success'),
          createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        };
      }).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).slice(0, 12),
    });
  } catch (error) {
    console.error('[/api/audit/wallet]', error);
    return NextResponse.json({ error: 'Could not load wallet activity.' }, { status: 500 });
  }
}
