import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { AUDIT_PACKS } from '@/lib/audit-packs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { domain, packType = 'single', userId } = body;

    if (!domain && !userId) {
      return NextResponse.json({ error: 'Domain or User ID is required.' }, { status: 400 });
    }

    const selectedPack = AUDIT_PACKS[packType] || AUDIT_PACKS.single;
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      // Fallback for simulation / test mode if Razorpay credentials are not yet configured in env
      return NextResponse.json({
        order_id: `order_sim_${Date.now()}`,
        amount: selectedPack.paise,
        currency: 'INR',
        key_id: keyId || 'rzp_test_simulated',
        domain: domain || 'wallet',
        packType,
        credits: selectedPack.credits,
        isSimulated: true,
      });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: selectedPack.paise,
      currency: 'INR',
      receipt: `aud_${Date.now().toString().slice(-8)}`,
      notes: {
        domain: (domain || 'wallet').toLowerCase(),
        packType,
        credits: selectedPack.credits.toString(),
        price_inr: selectedPack.priceInr.toString(),
        userId: userId || 'guest',
      },
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
      domain: domain || 'wallet',
      packType,
      credits: selectedPack.credits,
    });
  } catch (error: any) {
    console.error('Error creating audit order:', error);
    return NextResponse.json({ error: error.message || 'Failed to initialize payment' }, { status: 500 });
  }
}
