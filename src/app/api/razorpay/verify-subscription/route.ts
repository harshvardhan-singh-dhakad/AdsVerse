import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { adminAuth, adminDb } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials are not configured.');
      return NextResponse.json({ error: 'Payments are not configured. Please contact support.' }, { status: 503 });
    }

    // 1. Verify User Authentication via Bearer token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid or expired session token.' }, { status: 401 });
    }
    const uid = decodedToken.uid;

    const body = await req.json().catch(() => ({}));
    const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature, planTier } = body;

    if (!razorpay_subscription_id || !razorpay_payment_id || !razorpay_signature || !planTier || !SUBSCRIPTION_PLANS[planTier]) {
      return NextResponse.json({ error: 'Missing payment verification data or valid plan tier.' }, { status: 400 });
    }

    // Verify the Checkout signature before making any entitlement changes.
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest('hex');

    const expected = Buffer.from(generatedSignature, 'hex');
    const received = Buffer.from(razorpay_signature, 'hex');
    if (expected.length !== received.length || !crypto.timingSafeEqual(expected, received)) {
      return NextResponse.json({ error: 'Invalid Razorpay subscription signature.' }, { status: 400 });
    }

    // Fetch Razorpay's source of truth to prevent a valid checkout response for
    // another account or plan from granting an entitlement to this user.
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const razorpaySubscription = await razorpay.subscriptions.fetch(razorpay_subscription_id) as {
      status: string;
      notes?: Record<string, string>;
      current_end?: number;
      plan_id?: string;
    };
    if (razorpaySubscription.notes?.uid !== uid || razorpaySubscription.notes?.plan_tier !== planTier) {
      return NextResponse.json({ error: 'Subscription does not belong to this account or plan.' }, { status: 403 });
    }
    if (razorpaySubscription.plan_id !== process.env[SUBSCRIPTION_PLANS[planTier].envKey]) {
      return NextResponse.json({ error: 'Subscription plan does not match the selected plan.' }, { status: 403 });
    }
    if (!['authenticated', 'active'].includes(razorpaySubscription.status)) {
      return NextResponse.json({ error: 'Subscription payment is not active yet.' }, { status: 409 });
    }

    // 3. Update Firestore Subscription document immediately
    const docRef = adminDb.collection('subscriptions').doc(uid);
    const existingSnap = await docRef.get();
    const existingData = existingSnap.exists ? existingSnap.data() : null;

    const periodEnd = razorpaySubscription.current_end
      ? new Date(razorpaySubscription.current_end * 1000)
      : null;

    await docRef.set({
      uid,
      plan: planTier,
      siteSlots: existingData?.siteSlots || [],
      status: 'active',
      razorpaySubscriptionId: razorpay_subscription_id,
      lastPaymentId: razorpay_payment_id,
      currentPeriodEnd: periodEnd,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    // 4. Log transaction for record-keeping
    try {
      // Payment IDs are unique at Razorpay, so they also make retries idempotent.
      const paymentRef = adminDb.collection('subscription_payments').doc(razorpay_payment_id);
      await paymentRef.set({
        id: paymentRef.id,
        uid,
        plan: planTier,
        amount: SUBSCRIPTION_PLANS[planTier].priceInr,
        subscriptionId: razorpay_subscription_id,
        paymentId: razorpay_payment_id || null,
        status: 'active',
        source: 'client_verify',
        createdAt: FieldValue.serverTimestamp(),
      });
    } catch (logErr) {
      console.warn('Subscription payment log error (non-fatal):', logErr);
    }

    return NextResponse.json({
      success: true,
      status: 'active',
      plan: planTier,
      subscriptionId: razorpay_subscription_id,
    });
  } catch (error: any) {
    console.error('Error verifying subscription:', error);
    return NextResponse.json({ error: error.message || 'Verification failed.' }, { status: 500 });
  }
}
