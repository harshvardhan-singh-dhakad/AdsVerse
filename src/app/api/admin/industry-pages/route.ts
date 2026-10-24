import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "@/firebase/admin";
import { ADMIN_EMAILS } from "@/lib/admin-auth";
import { countIndustryWords, getIndustryBySlug, INDUSTRIES, type Industry } from "@/lib/industries";
import { getEditableIndustryFields, INDUSTRY_EDITABLE_FIELDS, type IndustryEditableField } from "@/lib/industry-content-fields";

export const runtime = "nodejs";

async function requireAdmin(request: NextRequest): Promise<string | null> {
  const session = request.cookies.get("admin_session")?.value;
  if (!session) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(session, true);
    const email = String(decoded.email || "").toLowerCase();
    const [roleDoc, emailDoc, profileDoc] = await Promise.all([
      adminDb.collection("roles_admin").doc(decoded.uid).get(),
      email ? adminDb.collection("admins").doc(email).get() : Promise.resolve(null),
      adminDb.collection("audit_users").doc(decoded.uid).get(),
    ]);
    const allowed = ADMIN_EMAILS.includes(email) || roleDoc.exists || Boolean(emailDoc?.exists) ||
      profileDoc.data()?.role === "admin";
    return allowed ? email : null;
  } catch {
    return null;
  }
}

function cleanFields(raw: Record<string, unknown>): Partial<Record<IndustryEditableField, string>> {
  const fields: Partial<Record<IndustryEditableField, string>> = {};
  for (const key of INDUSTRY_EDITABLE_FIELDS) {
    const value = raw[key];
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (trimmed.length > 12000) throw new Error("Each content field must be 12,000 characters or less.");
    if (trimmed.length < 30) throw new Error("Each content field must contain at least 30 characters.");
    fields[key] = trimmed;
  }
  if (Object.keys(fields).length !== INDUSTRY_EDITABLE_FIELDS.length) {
    throw new Error("All industry content fields are required before saving.");
  }
  return fields;
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Administrator access required." }, { status: 401 });
  }

  try {
    const snapshot = await adminDb.collection("industryPageOverrides").get();
    const validSlugs = new Set(INDUSTRIES.map((industry) => industry.slug));
    const overrides: Record<string, Partial<Record<IndustryEditableField, string>>> = {};

    snapshot.docs.forEach((document) => {
      if (!validSlugs.has(document.id)) return;
      const data = document.data();
      const safe: Partial<Record<IndustryEditableField, string>> = {};
      for (const field of INDUSTRY_EDITABLE_FIELDS) {
        if (typeof data[field] === "string") safe[field] = data[field];
      }
      overrides[document.id] = safe;
    });

    const industries = INDUSTRIES.map((base) => {
      const merged = { ...base, ...(overrides[base.slug] || {}) } as Industry;
      return {
        slug: base.slug,
        name: base.name,
        category: base.category,
        icon: base.icon,
        summary: base.summary,
        fields: getEditableIndustryFields(merged),
        wordCount: countIndustryWords(merged),
        hasCustomContent: Boolean(overrides[base.slug]),
      };
    });

    return NextResponse.json({ success: true, industries });
  } catch (error: any) {
    console.error("[industry-pages GET]", error);
    return NextResponse.json({ error: "Industry content could not be loaded." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const adminEmail = await requireAdmin(request);
  if (!adminEmail) {
    return NextResponse.json({ error: "Administrator access required." }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const slug = typeof payload?.slug === "string" ? payload.slug.trim() : "";
    const base = getIndustryBySlug(slug);
    if (!base) {
      return NextResponse.json({ error: "Unknown industry page." }, { status: 400 });
    }
    if (!payload.fields || typeof payload.fields !== "object" || Array.isArray(payload.fields)) {
      return NextResponse.json({ error: "Industry content fields are required." }, { status: 400 });
    }

    const fields = cleanFields(payload.fields as Record<string, unknown>);
    const candidate = { ...base, ...fields } as Industry;
    const wordCount = countIndustryWords(candidate);
    if (wordCount < 1500) {
      return NextResponse.json({
        error: "This page would fall below the 1,500-word minimum. Add more useful industry-specific detail before saving.",
        wordCount,
      }, { status: 400 });
    }

    await adminDb.collection("industryPageOverrides").doc(slug).set({
      ...fields,
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: adminEmail,
    }, { merge: true });

    return NextResponse.json({ success: true, slug, wordCount });
  } catch (error: any) {
    const message = error?.message || "";
    const status = /characters|at least 30|content fields are required/i.test(message) ? 400 : 500;
    if (status === 500) console.error("[industry-pages POST]", error);
    return NextResponse.json({
      error: status === 400 ? message : "Industry content could not be saved.",
    }, { status });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Administrator access required." }, { status: 401 });
  }

  const slug = new URL(request.url).searchParams.get("slug") || "";
  if (!getIndustryBySlug(slug)) {
    return NextResponse.json({ error: "Unknown industry page." }, { status: 400 });
  }

  try {
    await adminDb.collection("industryPageOverrides").doc(slug).delete();
    return NextResponse.json({ success: true, slug, reset: true });
  } catch (error) {
    console.error("[industry-pages DELETE]", error);
    return NextResponse.json({ error: "Industry content could not be reset." }, { status: 500 });
  }
}
