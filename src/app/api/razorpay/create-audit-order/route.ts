import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { adminAuth } from '@/firebase/admin';
import { AUDIT_PACKS } from '@/lib/audit-packs';

function normalizeDomain(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > 253) return null;
  const candidate = value.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  return candidate && /^[a-z0-9.-]+$/i.test(candidate) ? candidate : null;
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Please log in before purchasing audit credits.' }, { status: 401 });
    }
    const decoded = await adminAuth.verifyIdToken(authHeader.slice(7));
    const body = await req.json().catch(() => ({}));
    const packType = typeof body.packType === 'string' ? body.packType : 'single';
    const selectedPack = AUDIT_PACKS[packType];
    const domain = normalizeDomain(body.domain) || 'wallet';
    if (!selectedPack) return NextResponse.json({ error: 'Invalid audit pack.' }, { status: 400 });
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials are not configured.');
      return NextResponse.json({ error: 'Payments are not configured. Please contact support.' }, { status: 503 });
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
        domain,
        packType,
        credits: selectedPack.credits.toString(),
        price_inr: selectedPack.priceInr.toString(),
        uid: decoded.uid,
      },
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
      domain,
      packType,
      credits: selectedPack.credits,
    });
  } catch (error: any) {
    console.error('Error creating audit order:', error);
    return NextResponse.json({ error: error.message || 'Failed to initialize payment' }, { status: 500 });
  }
}
