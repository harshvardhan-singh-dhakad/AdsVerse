import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/firebase/admin';
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
    // Keep the login decision consistent with Firestore's admin authorization
    // model. Admins may have been granted through the dedicated role records
    // even when their legacy audit_users profile still says "user".
    const [snap, roleAdminSnap, emailAdminSnap] = await Promise.all([
      userDocRef.get(),
      adminDb.collection('roles_admin').doc(uid).get(),
      email ? adminDb.collection('admins').doc(email).get() : Promise.resolve(null),
    ]);
    const hasAdminRecord = roleAdminSnap.exists || !!emailAdminSnap?.exists;
    const isConfiguredAdmin = ADMIN_EMAILS.includes(email) || hasAdminRecord;

    let role = 'user';
    let paidCredits = 0;

    // Check if email is in pre-configured admin list
    if (isConfiguredAdmin) {
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
      role = data?.role === 'admin' || isConfiguredAdmin ? 'admin' : 'user';
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

    if (role === 'admin') {
      try {
        await Promise.all([
          adminDb.collection('roles_admin').doc(uid).set({
            uid,
            email,
            role: 'admin',
            updatedAt: FieldValue.serverTimestamp(),
          }, { merge: true }),
          email ? adminDb.collection('admins').doc(email).set({
            uid,
            email,
            role: 'admin',
            updatedAt: FieldValue.serverTimestamp(),
          }, { merge: true }) : Promise.resolve(),
        ]);
      } catch (errAdmin) {
        console.warn('[/api/auth/sync-user] Warning updating roles_admin doc:', errAdmin);
      }
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
