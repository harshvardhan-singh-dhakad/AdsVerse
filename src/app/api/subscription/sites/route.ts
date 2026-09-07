import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { adminAuth, adminDb } from '@/firebase/admin';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';

type SiteAction = 'add' | 'remove';

function normalizeSiteUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > 2_048) return null;

  try {
    const url = new URL(value.trim());
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    url.hash = '';
    return url.toString();
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const token = authHeader.slice('Bearer '.length);
    const decodedToken = await adminAuth.verifyIdToken(token);
    const body = await req.json().catch(() => ({}));
    const action = body.action as SiteAction;
    const siteUrl = normalizeSiteUrl(body.siteUrl);

    if (!siteUrl || !['add', 'remove'].includes(action)) {
      return NextResponse.json({ error: 'Provide a valid website URL and action.' }, { status: 400 });
    }

    const subscriptionRef = adminDb.collection('subscriptions').doc(decodedToken.uid);
    const subscriptionSnap = await subscriptionRef.get();
    if (!subscriptionSnap.exists) {
      return NextResponse.json({ error: 'No active subscription found.' }, { status: 403 });
    }

    const subscription = subscriptionSnap.data() || {};
    const plan = SUBSCRIPTION_PLANS[subscription.plan];
    if (subscription.status !== 'active' || !plan) {
      return NextResponse.json({ error: 'An active subscription is required to manage websites.' }, { status: 403 });
    }

    const existingSites = Array.isArray(subscription.siteSlots)
      ? subscription.siteSlots.filter((site): site is string => typeof site === 'string')
      : [];

    let siteSlots: string[];
    if (action === 'add') {
      if (existingSites.some((site) => normalizeSiteUrl(site) === siteUrl)) {
        return NextResponse.json({ error: 'This website is already being tracked.' }, { status: 409 });
      }
      if (existingSites.length >= plan.sitesLimit) {
        return NextResponse.json({ error: `Your ${plan.name} allows up to ${plan.sitesLimit} website(s).` }, { status: 403 });
      }
      siteSlots = [...existingSites, siteUrl];
    } else {
      siteSlots = existingSites.filter((site) => normalizeSiteUrl(site) !== siteUrl);
    }

    await subscriptionRef.update({
      siteSlots,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ siteSlots });
  } catch (error: any) {
    if (error?.code === 'auth/id-token-expired' || error?.code === 'auth/argument-error') {
      return NextResponse.json({ error: 'Your session has expired. Please log in again.' }, { status: 401 });
    }
    console.error('Error updating subscription sites:', error);
    return NextResponse.json({ error: 'Unable to update tracked websites.' }, { status: 500 });
  }
}
