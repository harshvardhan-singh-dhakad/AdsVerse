import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { domain } = body;

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required.' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      // Fallback for simulation / test mode if Razorpay credentials are not yet configured in env
      return NextResponse.json({
        order_id: `order_sim_${Date.now()}`,
        amount: 1000, // 1000 paise = 10 INR
        currency: 'INR',
        key_id: keyId || 'rzp_test_simulated',
        domain,
        isSimulated: true,
      });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: 1000, // ₹10 = 1000 paise
      currency: 'INR',
      receipt: `audit_${Date.now().toString().slice(-8)}`,
      notes: {
        domain: domain.toLowerCase(),
        type: 'seo_audit_single',
        price_inr: '10',
      },
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
      domain,
    });
  } catch (error: any) {
    console.error('Error creating audit order:', error);
    return NextResponse.json({ error: error.message || 'Failed to initialize payment' }, { status: 500 });
  }
}
