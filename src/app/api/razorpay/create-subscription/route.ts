import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

const PLAN_MAP: Record<string, string> = {
  '1_site': process.env.RAZORPAY_PLAN_1_SITE || 'plan_1',
  '3_site': process.env.RAZORPAY_PLAN_3_SITE || 'plan_3',
  '5_site': process.env.RAZORPAY_PLAN_5_SITE || 'plan_5',
  '10_site': process.env.RAZORPAY_PLAN_10_SITE || 'plan_10',
};

export async function POST(req: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
    });
    // 1. Verify User Authentication via Bearer token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    const uid = decodedToken.uid;

    const { plan } = await req.json();
    if (!plan || !PLAN_MAP[plan]) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const planId = PLAN_MAP[plan];

    // 2. Create Razorpay Subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 120, // 10 years limit usually
      notes: {
        uid: uid,
        plan_tier: plan,
      }
    });

    // 3. Return Subscription ID to client
    return NextResponse.json({
      subscription_id: subscription.id,
      plan_tier: plan,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
