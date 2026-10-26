import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { FieldValue } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "@/firebase/admin";
import { ADMIN_EMAILS } from "@/lib/admin-auth";
import { countIndustryWords, getIndustryBySlug, INDUSTRIES, type Industry } from "@/lib/industries";
import { getEditableIndustryFields, INDUSTRY_EDITABLE_FIELDS, type IndustryEditableField } from "@/lib/industry-content-fields";
import { MAX_INDUSTRY_GALLERY_IMAGES, type IndustryGalleryImage } from "@/lib/industry-image-types";
import { getIndustryStaticImage } from "@/lib/industry-static-images";

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

function cleanGalleryImages(raw: unknown, slug: string): IndustryGalleryImage[] {
  if (!Array.isArray(raw)) {
    throw new Error("Gallery images must be provided as a list.");
  }
  if (raw.length > MAX_INDUSTRY_GALLERY_IMAGES) {
    throw new Error("You can add up to " + MAX_INDUSTRY_GALLERY_IMAGES + " images to one industry page.");
  }

  return raw.map((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new Error("Gallery image " + (index + 1) + " is invalid.");
    }
    const data = item as Record<string, unknown>;
    const url = typeof data.url === "string" ? data.url.trim() : "";
    const storagePath = typeof data.storagePath === "string" ? data.storagePath.trim() : "";
    const altText = typeof data.altText === "string" ? data.altText.trim() : "";
    const caption = typeof data.caption === "string" ? data.caption.trim() : "";

    let parsedUrl: URL | null = null;
    try {
      parsedUrl = new URL(url);
    } catch {
      parsedUrl = null;
    }

    if (
      !parsedUrl ||
      parsedUrl.protocol !== "https:" ||
      parsedUrl.hostname !== "firebasestorage.googleapis.com"
    ) {
      throw new Error("Gallery images must use a secure Firebase Storage image URL.");
    }
    if (
      !storagePath.startsWith("industry-pages/" + slug + "/") ||
      storagePath.includes("..") ||
      storagePath.length > 512
    ) {
      throw new Error("Gallery image storage path is invalid for this industry page.");
    }
    if (!altText || altText.length > 180) {
      throw new Error("Every gallery image needs descriptive alt text of 180 characters or less.");
    }
    if (caption.length > 250) {
      throw new Error("Image captions must be 250 characters or less.");
    }

    return { url, storagePath, altText, caption };
  });
}

function readGalleryImages(raw: unknown, slug: string): IndustryGalleryImage[] {
  if (!Array.isArray(raw)) return [];
  try {
    return cleanGalleryImages(raw.slice(0, MAX_INDUSTRY_GALLERY_IMAGES), slug);
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Administrator access required." }, { status: 401 });
  }

  try {
    const snapshot = await adminDb.collection("industryPageOverrides").get();
    const validSlugs = new Set(INDUSTRIES.map((industry) => industry.slug));
    const overrides: Record<string, {
      fields: Partial<Record<IndustryEditableField, string>>;
      images: IndustryGalleryImage[];
    }> = {};

    snapshot.docs.forEach((document) => {
      if (!validSlugs.has(document.id)) return;
      const data = document.data();
      const safe: Partial<Record<IndustryEditableField, string>> = {};
      for (const field of INDUSTRY_EDITABLE_FIELDS) {
        if (typeof data[field] === "string") safe[field] = data[field];
      }
      overrides[document.id] = {
        fields: safe,
        images: readGalleryImages(data.images, document.id),
      };
    });

    const industries = INDUSTRIES.map((base) => {
      const override = overrides[base.slug];
      const merged = { ...base, ...(override?.fields || {}) } as Industry;
      return {
        slug: base.slug,
        name: base.name,
        category: base.category,
        icon: base.icon,
        summary: base.summary,
        fields: getEditableIndustryFields(merged),
        images: override?.images || [],
        defaultImage: getIndustryStaticImage(base.slug) || null,
        wordCount: countIndustryWords(merged),
        hasCustomContent: Boolean(override),
      };
    });

    return NextResponse.json({ success: true, industries });
  } catch (error: unknown) {
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

    const overrideRef = adminDb.collection("industryPageOverrides").doc(slug);
    const previousSnapshot = await overrideRef.get();
    const previousData = previousSnapshot.data() || {};
    const images = Object.prototype.hasOwnProperty.call(payload, "images")
      ? cleanGalleryImages(payload.images, slug)
      : readGalleryImages(previousData.images, slug);

    await overrideRef.set({
      ...fields,
      images,
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: adminEmail,
    }, { merge: true });

    revalidatePath("/industries/" + slug);
    revalidatePath("/industries");
    return NextResponse.json({
      success: true,
      slug,
      wordCount,
      imageCount: images.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "";
    const isValidationError = /characters|at least 30|content fields are required|gallery images|up to \d+ images|gallery image|alt text|captions|secure Firebase Storage/i.test(message);
    if (!isValidationError) console.error("[industry-pages POST]", error);
    return NextResponse.json({
      error: isValidationError ? message : "Industry content could not be saved.",
    }, { status: isValidationError ? 400 : 500 });
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
    revalidatePath("/industries/" + slug);
    revalidatePath("/industries");
    return NextResponse.json({ success: true, slug, reset: true });
  } catch (error) {
    console.error("[industry-pages DELETE]", error);
    return NextResponse.json({ error: "Industry content could not be reset." }, { status: 500 });
  }
}
