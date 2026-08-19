import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { AUDIT_PACKS } from '../create-audit-order/route';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, domain, packType = 'single', userId } = body;

    if (!domain && !userId) {
      return NextResponse.json({ error: 'Domain or User ID is required.' }, { status: 400 });
    }

    const cleanDomain = domain ? domain.toLowerCase().trim() : '';
    const selectedPack = AUDIT_PACKS[packType] || AUDIT_PACKS.single;
    const creditsToAdd = selectedPack.credits;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Verify signature if keySecret is available
    if (keySecret && razorpay_order_id && razorpay_payment_id && razorpay_signature && !razorpay_order_id.startsWith('order_sim_')) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json({ error: 'Invalid payment signature.' }, { status: 400 });
      }
    }

    // 1. Credit the domain in Firestore
    if (cleanDomain && cleanDomain !== 'wallet') {
      const domainDocRef = adminDb.collection('audited_domains').doc(cleanDomain);
      const domainSnap = await domainDocRef.get();

      if (domainSnap.exists) {
        await domainDocRef.update({
          paidCredits: FieldValue.increment(creditsToAdd),
          lastPaymentAt: FieldValue.serverTimestamp(),
          lastPaymentId: razorpay_payment_id || `sim_${Date.now()}`,
        });
      } else {
        await domainDocRef.set({
          domain: cleanDomain,
          firstAuditAt: FieldValue.serverTimestamp(),
          lastAuditAt: FieldValue.serverTimestamp(),
          auditCount: 0,
          paidCredits: creditsToAdd,
          lastPaymentAt: FieldValue.serverTimestamp(),
          lastPaymentId: razorpay_payment_id || `sim_${Date.now()}`,
        });
      }
    }

    // 2. Credit the User profile if userId provided
    if (userId && userId !== 'guest') {
      try {
        const userDocRef = adminDb.collection('audit_users').doc(userId);
        await userDocRef.set(
          {
            paidCredits: FieldValue.increment(creditsToAdd),
            plan: 'paid',
            lastRechargeAt: FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      } catch (e) {
        console.warn('Failed to credit user account:', e);
      }
    }

    // 3. Record transaction in audit_payments collection
    const paymentRecordRef = adminDb.collection('audit_payments').doc();
    await paymentRecordRef.set({
      id: paymentRecordRef.id,
      domain: cleanDomain || 'wallet',
      userId: userId || 'guest',
      packType,
      credits: creditsToAdd,
      amount: selectedPack.priceInr,
      currency: 'INR',
      orderId: razorpay_order_id || null,
      paymentId: razorpay_payment_id || null,
      createdAt: FieldValue.serverTimestamp(),
      status: 'success',
    });

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      creditsAdded: creditsToAdd,
      message: `Successfully added ${creditsToAdd} audit ${creditsToAdd > 1 ? 'credits' : 'pass'}!`,
    });
  } catch (error: any) {
    console.error('Error verifying audit payment:', error);
    return NextResponse.json({ error: error.message || 'Payment verification failed.' }, { status: 500 });
  }
}
