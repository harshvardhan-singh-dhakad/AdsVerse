import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, domain } = body;

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required.' }, { status: 400 });
    }

    const cleanDomain = domain.toLowerCase().trim();
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If keySecret is set and order is real, verify signature
    if (keySecret && razorpay_order_id && razorpay_payment_id && razorpay_signature && !razorpay_order_id.startsWith('order_sim_')) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json({ error: 'Invalid payment signature.' }, { status: 400 });
      }
    }

    // Credit the domain in Firestore with 1 paid credit for re-audit
    const domainDocRef = adminDb.collection('audited_domains').doc(cleanDomain);
    const domainSnap = await domainDocRef.get();

    if (domainSnap.exists) {
      await domainDocRef.update({
        paidCredits: FieldValue.increment(1),
        lastPaymentAt: FieldValue.serverTimestamp(),
        lastPaymentId: razorpay_payment_id || `sim_${Date.now()}`,
      });
    } else {
      await domainDocRef.set({
        domain: cleanDomain,
        firstAuditAt: FieldValue.serverTimestamp(),
        lastAuditAt: FieldValue.serverTimestamp(),
        auditCount: 0,
        paidCredits: 1,
        lastPaymentAt: FieldValue.serverTimestamp(),
        lastPaymentId: razorpay_payment_id || `sim_${Date.now()}`,
      });
    }

    // Also record transaction in audit_payments collection
    const paymentRecordRef = adminDb.collection('audit_payments').doc();
    await paymentRecordRef.set({
      id: paymentRecordRef.id,
      domain: cleanDomain,
      amount: 10,
      currency: 'INR',
      orderId: razorpay_order_id || null,
      paymentId: razorpay_payment_id || null,
      createdAt: FieldValue.serverTimestamp(),
      status: 'success',
    });

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      message: `Audit pass unlocked for ${cleanDomain}!`,
    });
  } catch (error: any) {
    console.error('Error verifying audit payment:', error);
    return NextResponse.json({ error: error.message || 'Payment verification failed.' }, { status: 500 });
  }
}
