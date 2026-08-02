import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const { idToken, phone } = await req.json() as { idToken: string; phone: string | null };

    if (!idToken) return NextResponse.json({ error: 'Missing idToken' }, { status: 400 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;

    const userRef = adminDb.collection('audit_users').doc(uid);
    const snap = await userRef.get();

    if (!snap.exists) {
      await userRef.set({
        uid,
        email: decoded.email ?? '',
        displayName: decoded.name ?? '',
        phone: phone ?? null,
        plan: 'free',
        reportsRemaining: -1,
        subscriptionExpiry: null,
        createdAt: FieldValue.serverTimestamp(),
      });
    } else {
      // Only update phone if it hasn't been set before
      const existing = snap.data();
      if (existing?.phone === undefined) {
        await userRef.update({ phone: phone ?? null });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[/api/audit/save-profile]', err);
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
  }
}
