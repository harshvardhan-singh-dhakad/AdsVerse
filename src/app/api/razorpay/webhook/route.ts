import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { AUDIT_PACKS } from '@/lib/audit-packs';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    if (!WEBHOOK_SECRET) {
      console.error('RAZORPAY_WEBHOOK_SECRET is not configured.');
      return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 503 });
    }

    const bodyText = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(bodyText)
      .digest('hex');

    const expected = Buffer.from(expectedSignature, 'hex');
    const received = Buffer.from(signature, 'hex');
    if (expected.length !== received.length || !crypto.timingSafeEqual(expected, received)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(bodyText);
    const event = payload.event;

    // =========================================================================
    // 1. SUBSCRIPTION EVENTS (1_site, 3_site, 5_site, 10_site)
    // =========================================================================
    const subscription = payload.payload?.subscription?.entity;

    if (subscription) {
      const subId = subscription.id;
      const notes = subscription.notes || {};
      const uid = notes.uid;
      const plan_tier = notes.plan_tier;
      const planConfig = SUBSCRIPTION_PLANS[plan_tier];

      if (!uid || !planConfig || subscription.plan_id !== process.env[planConfig.envKey]) {
        console.warn(`Webhook received for sub ${subId} with invalid account or plan metadata. Ignoring.`);
        return NextResponse.json({ status: 'ignored' }, { status: 200 });
      }

      const docRef = adminDb.collection('subscriptions').doc(uid);

      switch (event) {
        case 'subscription.authenticated':
        case 'subscription.activated': {
          const docSnap = await docRef.get();
          const existingData = docSnap.exists ? docSnap.data() : null;

          await docRef.set({
            uid,
            plan: plan_tier,
            // Preserve existing siteSlots if already configured, otherwise initialize empty
            siteSlots: existingData?.siteSlots || [],
            status: 'active',
            razorpaySubscriptionId: subId,
            currentPeriodEnd: subscription.current_end ? new Date(subscription.current_end * 1000) : null,
            updatedAt: new Date()
          }, { merge: true });
          break;
        }

        case 'subscription.charged':
          await docRef.set({
            status: 'active',
            currentPeriodEnd: subscription.current_end ? new Date(subscription.current_end * 1000) : null,
            updatedAt: new Date()
          }, { merge: true });
          break;

        case 'subscription.cancelled':
        case 'subscription.completed':
          await docRef.set({
            status: event === 'subscription.completed' ? 'completed' : 'cancelled',
            updatedAt: new Date()
          }, { merge: true });
          break;

        case 'subscription.pending':
        case 'subscription.halted':
        case 'subscription.paused':
          await docRef.set({
            status: 'past_due',
            updatedAt: new Date()
          }, { merge: true });
          break;

        case 'subscription.resumed':
        case 'subscription.updated':
          await docRef.set({
            status: 'active',
            currentPeriodEnd: subscription.current_end ? new Date(subscription.current_end * 1000) : null,
            updatedAt: new Date()
          }, { merge: true });
          break;

        case 'payment.failed':
          // A recurring payment failed on a subscription
          await docRef.set({
            status: 'past_due',
            updatedAt: new Date()
          }, { merge: true });
          break;

        default:
          console.log(`Unhandled subscription event: ${event}`);
      }

      return NextResponse.json({ status: 'success', type: 'subscription', event }, { status: 200 });
    }

    // =========================================================================
    // 2. ONE-TIME AUDIT PACK EVENTS (single, wallet_5, wallet_12)
    // =========================================================================
    const paymentEntity = payload.payload?.payment?.entity;
    const orderEntity = payload.payload?.order?.entity;

    if (event === 'payment.captured') {
      const notes = paymentEntity?.notes || orderEntity?.notes || {};
      const packType = notes.packType;
      const userId = notes.uid;

      // Only accept audit packs created by our checkout route. Do not trust a
      // free-form credits value placed in Razorpay order notes.
      if (packType && AUDIT_PACKS[packType]) {
        const paymentId = paymentEntity?.id;
        const orderId = orderEntity?.id || paymentEntity?.order_id;
        const selectedPack = AUDIT_PACKS[packType];
        if (!paymentId || !userId || paymentEntity?.amount !== selectedPack.paise || paymentEntity?.currency !== 'INR') {
          return NextResponse.json({ status: 'ignored', reason: 'payment_amount_mismatch' }, { status: 200 });
        }
        const creditsToAdd = selectedPack.credits;

        // The payment document ID is the Razorpay payment ID. Reading it and
        // crediting the wallet in the same transaction makes webhook retries
        // and duplicate delivery exactly-once operations.
        const paymentRef = adminDb.collection('audit_payments').doc(paymentId);
        const userRef = adminDb.collection('audit_users').doc(userId);
        let alreadyProcessed = false;
        await adminDb.runTransaction(async (transaction) => {
          const existingPayment = await transaction.get(paymentRef);
          if (existingPayment.exists) {
            alreadyProcessed = true;
            return;
          }

          transaction.set(userRef, {
            paidCredits: FieldValue.increment(creditsToAdd),
            plan: 'paid',
            lastRechargeAt: FieldValue.serverTimestamp(),
          }, { merge: true });
          transaction.set(paymentRef, {
            id: paymentId,
            domain: String(notes.domain || 'wallet'),
            userId,
            packType,
            amount: selectedPack.priceInr,
            currency: 'INR',
            credits: creditsToAdd,
            paymentId,
            orderId: orderId || null,
            source: 'razorpay_webhook',
            status: 'success',
            createdAt: FieldValue.serverTimestamp(),
          });
        });

        return NextResponse.json({
          status: alreadyProcessed ? 'already_processed' : 'success',
          type: 'audit_pack',
          packType,
          credits: creditsToAdd,
          paymentId,
        }, { status: 200 });
      }
    }

    // Default: Unhandled event or non-package event
    return NextResponse.json({ status: 'ignored', event }, { status: 200 });

  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
