import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const ADMIN_EMAILS = [
  'admin@adsverse.in',
  'harshvardhan@adsverse.in',
  'harshvardhan.dhakad@gmail.com',
  'harshvardhan.singh.dhakad@gmail.com',
];

export async function POST(req: NextRequest) {
  try {
    const { idToken, name, phone } = await req.json() as { idToken: string; name?: string; phone?: string };

    if (!idToken) {
      return NextResponse.json({ error: 'Missing idToken' }, { status: 400 });
    }

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;
    const email = decoded.email ? decoded.email.toLowerCase() : '';
    const displayName = name || decoded.name || email.split('@')[0] || 'User';
    const photoURL = decoded.picture || '';
    const provider = decoded.firebase?.sign_in_provider || 'password';

    const userDocRef = adminDb.collection('audit_users').doc(uid);
    const snap = await userDocRef.get();

    let role = 'user';
    let paidCredits = 0;

    // Check if email is in pre-configured admin list
    if (ADMIN_EMAILS.includes(email)) {
      role = 'admin';
    }

    if (!snap.exists) {
      // Create new user profile in Firestore
      await userDocRef.set({
        uid,
        email,
        displayName,
        photoURL,
        phone: phone || null,
        provider,
        role,
        paidCredits: 0,
        plan: 'free',
        reportsRemaining: 1,
        createdAt: FieldValue.serverTimestamp(),
        lastLoginAt: FieldValue.serverTimestamp(),
      });
    } else {
      // Update existing user profile
      const data = snap.data();
      role = data?.role === 'admin' || ADMIN_EMAILS.includes(email) ? 'admin' : 'user';
      paidCredits = Number(data?.paidCredits || 0);

      await userDocRef.set({
        displayName: data?.displayName || displayName,
        photoURL: photoURL || data?.photoURL || '',
        provider: provider || data?.provider || 'password',
        role,
        lastLoginAt: FieldValue.serverTimestamp(),
        ...(phone && !data?.phone ? { phone } : {}),
      }, { merge: true });
    }

    return NextResponse.json({
      success: true,
      user: {
        uid,
        email,
        displayName,
        photoURL,
        role,
        paidCredits,
      },
    });
  } catch (err: any) {
    console.error('[/api/auth/sync-user] Error:', err);
    return NextResponse.json({ error: err?.message || 'Failed to sync user profile' }, { status: 500 });
  }
}
