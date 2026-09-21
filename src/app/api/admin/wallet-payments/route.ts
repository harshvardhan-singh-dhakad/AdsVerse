import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/firebase/admin';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = new Set([
  'admin@adsverse.in',
  'harshvardhan@adsverse.in',
  'harshvardhan.dhakad@gmail.com',
  'harshvardhan.singh.dhakad@gmail.com',
]);

export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    const decoded = await adminAuth.verifyIdToken(authorization.slice(7));
    const [roleDoc, profile] = await Promise.all([
      adminDb.collection('roles_admin').doc(decoded.uid).get(),
      adminDb.collection('audit_users').doc(decoded.uid).get(),
    ]);
    const isAdmin = roleDoc.exists || profile.data()?.role === 'admin' || ADMIN_EMAILS.has(decoded.email || '');
    if (!isAdmin) return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });

    const payments = await adminDb.collection('audit_payments').orderBy('createdAt', 'desc').limit(20).get();
    return NextResponse.json({
      payments: payments.docs.map((payment) => {
        const data = payment.data();
        return {
          id: payment.id,
          userId: String(data.userId || ''),
          credits: Number(data.credits || 0),
          amount: Number(data.amount || 0),
          status: String(data.status || 'success'),
          createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        };
      }),
    });
  } catch (error) {
    console.error('[/api/admin/wallet-payments]', error);
    return NextResponse.json({ error: 'Could not load payment activity.' }, { status: 500 });
  }
}
