import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/lib/firebase-admin';

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'secret';

export async function POST(req: NextRequest) {
  try {
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

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(bodyText);
    const event = payload.event;
    
    // Most subscription events carry the subscription object under payload.subscription.entity
    const subscription = payload.payload?.subscription?.entity;
    
    if (!subscription) {
      // If it's not a subscription event, ignore it for now
      return NextResponse.json({ status: 'ignored' }, { status: 200 });
    }

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
      case 'subscription.activated':
        await docRef.set({
          uid,
          plan: plan_tier,
          siteSlots: [], // Start with empty slots, user will add via dashboard
          status: 'active',
          razorpaySubscriptionId: subId,
          currentPeriodEnd: subscription.current_end ? new Date(subscription.current_end * 1000) : null,
          updatedAt: new Date()
        }, { merge: true });
        break;

      case 'subscription.charged':
        await docRef.set({
          status: 'active',
          currentPeriodEnd: subscription.current_end ? new Date(subscription.current_end * 1000) : null,
          updatedAt: new Date()
        }, { merge: true });
        break;

      case 'subscription.cancelled':
        await docRef.set({
          status: 'cancelled',
          updatedAt: new Date()
        }, { merge: true });
        break;
        
      case 'subscription.halted':
      case 'subscription.paused':
        await docRef.set({
          status: 'past_due',
          updatedAt: new Date()
        }, { merge: true });
        break;

      case 'payment.failed':
        // A payment failed on a subscription
        await docRef.set({
          status: 'past_due',
          updatedAt: new Date()
        }, { merge: true });
        break;

      default:
        console.log(`Unhandled event: ${event}`);
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });

  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
