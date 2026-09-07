import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { adminAuth } from '@/firebase/admin';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

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

    const { plan } = await req.json().catch(() => ({}));
    const planConfig = SUBSCRIPTION_PLANS[plan];

    if (!plan || !planConfig) {
      return NextResponse.json({
        error: `Invalid plan selected: '${plan}'. Valid plans are: ${Object.keys(SUBSCRIPTION_PLANS).join(', ')}`
      }, { status: 400 });
    }

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials are not configured.');
      return NextResponse.json({ error: 'Payments are not configured. Please contact support.' }, { status: 503 });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Plan IDs are provisioned once in Razorpay and configured per environment.
    // Creating plans during checkout creates duplicates and makes reconciliation unreliable.
    const planId = process.env[planConfig.envKey];

    if (!planId || !planId.startsWith('plan_')) {
      console.error(`Missing or invalid Razorpay plan configuration: ${planConfig.envKey}`);
      return NextResponse.json({ error: 'This subscription plan is not configured. Please contact support.' }, { status: 503 });
    }

    // 3. Create Razorpay Subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 120, // 10 years monthly max
      notes: {
        uid: uid,
        plan_tier: plan,
      },
    });

    // 4. Return Subscription ID to client
    return NextResponse.json({
      subscription_id: subscription.id,
      plan_tier: plan,
      key_id: keyId,
    });
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
