import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { adminAuth, adminDb } from '@/firebase/admin';
import { AUDIT_PACKS } from '@/lib/audit-packs';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    const decoded = await adminAuth.verifyIdToken(authHeader.slice(7));
    const body = await req.json().catch(() => ({}));
    const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = body;
    if (![orderId, paymentId, signature].every((value) => typeof value === 'string' && value.length > 0)) {
      return NextResponse.json({ error: 'Missing payment verification data.' }, { status: 400 });
    }
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) return NextResponse.json({ error: 'Payments are not configured.' }, { status: 503 });
    const expected = Buffer.from(crypto.createHmac('sha256', keySecret).update(`${orderId}|${paymentId}`).digest('hex'), 'hex');
    const received = Buffer.from(signature, 'hex');
    if (expected.length !== received.length || !crypto.timingSafeEqual(expected, received)) return NextResponse.json({ error: 'Invalid payment signature.' }, { status: 400 });
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const [order, payment] = await Promise.all([razorpay.orders.fetch(orderId), razorpay.payments.fetch(paymentId)]);
    const notes = (order as any).notes || {};
    const packType = String(notes.packType || '');
    const selectedPack = AUDIT_PACKS[packType];
    if (!selectedPack || notes.uid !== decoded.uid || order.status !== 'paid' || order.amount !== selectedPack.paise || order.currency !== 'INR' || (payment as any).order_id !== orderId || (payment as any).status !== 'captured') {
      return NextResponse.json({ error: 'Payment does not match this account or audit pack.' }, { status: 403 });
    }

    // Wallet credits are intentionally granted only by the signed Razorpay
    // webhook. This endpoint validates the checkout response for the browser,
    // then reports whether that webhook has finished processing it.
    const paymentRef = adminDb.collection('audit_payments').doc(paymentId);
    const paymentRecord = await paymentRef.get();
    if (paymentRecord.exists && paymentRecord.data()?.userId !== decoded.uid) {
      return NextResponse.json({ error: 'This payment belongs to another account.' }, { status: 409 });
    }
    const credited = paymentRecord.exists && paymentRecord.data()?.status === 'success';
    return NextResponse.json({
      success: true,
      credited,
      message: credited
        ? `${selectedPack.credits} audit credit(s) added.`
        : 'Payment verified. Waiting for secure wallet credit confirmation.',
    });
  } catch (error: any) {
    console.error('Error verifying audit payment:', error);
    return NextResponse.json({ error: error.message || 'Payment verification failed.' }, { status: 500 });
  }
}
