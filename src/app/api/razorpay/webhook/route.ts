import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { AUDIT_PACKS } from '@/lib/audit-packs';

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

      if (!uid) {
        console.warn(`Webhook received for sub ${subId} but no UID in notes. Ignoring.`);
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

    if (event === 'order.paid' || event === 'payment.captured') {
      const notes = paymentEntity?.notes || orderEntity?.notes || {};
      const packType = notes.packType;
      const domain = notes.domain;
      const userId = notes.userId;

      // Verify this is an SEO audit pack purchase
      if (packType && (AUDIT_PACKS[packType] || notes.credits)) {
        const paymentId = paymentEntity?.id;
        const orderId = orderEntity?.id || paymentEntity?.order_id;
        const selectedPack = AUDIT_PACKS[packType] || AUDIT_PACKS.single;
        const creditsToAdd = Number(notes.credits) || selectedPack.credits;
        const cleanDomain = domain ? domain.toLowerCase().trim() : '';

        // Idempotency: check if this payment was already processed
        if (paymentId) {
          const directDoc = await adminDb.collection('audit_payments').doc(paymentId).get();
          if (directDoc.exists && directDoc.data()?.status === 'success') {
            return NextResponse.json({ status: 'already_processed', paymentId }, { status: 200 });
          }

          const paySnap = await adminDb.collection('audit_payments')
            .where('paymentId', '==', paymentId)
            .limit(1)
            .get();
          if (!paySnap.empty) {
            return NextResponse.json({ status: 'already_processed', paymentId }, { status: 200 });
          }
        }

        if (orderId) {
          const orderSnap = await adminDb.collection('audit_payments')
            .where('orderId', '==', orderId)
            .limit(1)
            .get();
          if (!orderSnap.empty) {
            return NextResponse.json({ status: 'already_processed', orderId }, { status: 200 });
          }
        }

        // 2a. Credit the Domain record if specified
        if (cleanDomain && cleanDomain !== 'wallet') {
          const domainDocRef = adminDb.collection('audited_domains').doc(cleanDomain);
          const domainSnap = await domainDocRef.get();

          if (domainSnap.exists) {
            await domainDocRef.update({
              paidCredits: FieldValue.increment(creditsToAdd),
              lastPaymentAt: FieldValue.serverTimestamp(),
              lastPaymentId: paymentId || orderId || 'webhook',
            });
          } else {
            await domainDocRef.set({
              domain: cleanDomain,
              firstAuditAt: FieldValue.serverTimestamp(),
              lastAuditAt: FieldValue.serverTimestamp(),
              auditCount: 0,
              paidCredits: creditsToAdd,
              lastPaymentAt: FieldValue.serverTimestamp(),
              lastPaymentId: paymentId || orderId || 'webhook',
            });
          }
        }

        // 2b. Credit the User profile if userId provided
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
            console.warn('Webhook: Failed to credit user account:', e);
          }
        }

        // 2c. Record transaction in audit_payments collection (idempotent doc ID)
        const recordId = paymentId || orderId || adminDb.collection('audit_payments').doc().id;
        await adminDb.collection('audit_payments').doc(recordId).set({
          id: recordId,
          domain: cleanDomain || 'wallet',
          userId: userId || 'guest',
          packType,
          amount: selectedPack.priceInr,
          currency: 'INR',
          credits: creditsToAdd,
          paymentId: paymentId || null,
          orderId: orderId || null,
          source: 'razorpay_webhook',
          status: 'success',
          createdAt: FieldValue.serverTimestamp(),
        }, { merge: true });

        return NextResponse.json({
          status: 'success',
          type: 'audit_pack',
          packType,
          credits: creditsToAdd,
          domain: cleanDomain || 'wallet'
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
