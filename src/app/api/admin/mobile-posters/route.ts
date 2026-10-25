import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { FieldValue } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "@/firebase/admin";
import { ADMIN_EMAILS } from "@/lib/admin-auth";

export const runtime = "nodejs";

type AdminContext = { uid: string; email: string };

async function requireAdmin(request: NextRequest): Promise<AdminContext | null> {
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
    return allowed ? { uid: decoded.uid, email } : null;
  } catch {
    return null;
  }
}

function safeDestination(value: string): boolean {
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function serializePoster(id: string, raw: FirebaseFirestore.DocumentData) {
  return {
    id,
    title: String(raw.title || ""),
    imageUrl: String(raw.imageUrl || ""),
    imageStoragePath: String(raw.imageStoragePath || ""),
    imageAlt: String(raw.imageAlt || raw.title || ""),
    buttonText: String(raw.buttonText || ""),
    targetUrl: String(raw.targetUrl || ""),
    displayOrder: Number.isFinite(Number(raw.displayOrder)) ? Math.max(0, Number(raw.displayOrder)) : 0,
    isPublished: raw.isPublished === true,
  };
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Administrator access required." }, { status: 401 });
  }

  try {
    const snapshot = await adminDb.collection("mobilePosters").get();
    const posters = snapshot.docs
      .map((document) => serializePoster(document.id, document.data()))
      .sort((a, b) => a.displayOrder - b.displayOrder);
    return NextResponse.json({ success: true, posters }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[mobile-posters GET]", error);
    return NextResponse.json({ error: "Posters could not be loaded." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Administrator access required." }, { status: 401 });
  }

  try {
    const payload = await request.json() as Record<string, unknown>;
    const id = typeof payload.id === "string" ? payload.id.trim() : "";
    const title = typeof payload.title === "string" ? payload.title.trim() : "";
    const imageUrl = typeof payload.imageUrl === "string" ? payload.imageUrl.trim() : "";
    const imageStoragePath = typeof payload.imageStoragePath === "string" ? payload.imageStoragePath.trim() : "";
    const imageAlt = typeof payload.imageAlt === "string" ? payload.imageAlt.trim() : "";
    const buttonText = typeof payload.buttonText === "string" ? payload.buttonText.trim() : "";
    const targetUrl = typeof payload.targetUrl === "string" ? payload.targetUrl.trim() : "";
    const displayOrder = Number(payload.displayOrder);
    const isPublished = payload.isPublished;

    if (!title || title.length > 120) {
      return NextResponse.json({ error: "Poster name is required and must be 120 characters or less." }, { status: 400 });
    }
    if (!imageAlt || imageAlt.length > 180) {
      return NextResponse.json({ error: "Image alt text is required and must be 180 characters or less." }, { status: 400 });
    }
    if (!imageUrl.startsWith("https://")) {
      return NextResponse.json({ error: "Upload a poster image before saving." }, { status: 400 });
    }
    if (!imageStoragePath.startsWith("mobile-posters/") || imageStoragePath.includes("..")) {
      return NextResponse.json({ error: "The poster image storage path is invalid." }, { status: 400 });
    }
    if (!buttonText || buttonText.length > 40) {
      return NextResponse.json({ error: "Button text is required and must be 40 characters or less." }, { status: 400 });
    }
    if (!targetUrl || targetUrl.length > 2048 || !safeDestination(targetUrl)) {
      return NextResponse.json({ error: "Use a valid internal path (such as /services/seo-optimization) or an HTTPS URL." }, { status: 400 });
    }
    if (!Number.isInteger(displayOrder) || displayOrder < 0 || displayOrder > 1000000) {
      return NextResponse.json({ error: "Display order must be a whole number from 0 to 1,000,000." }, { status: 400 });
    }
    if (typeof isPublished !== "boolean") {
      return NextResponse.json({ error: "Choose whether this poster should be published." }, { status: 400 });
    }
    if (id && !/^[A-Za-z0-9_-]{1,128}$/.test(id)) {
      return NextResponse.json({ error: "Poster identifier is invalid." }, { status: 400 });
    }

    const collection = adminDb.collection("mobilePosters");
    const posterRef = id ? collection.doc(id) : collection.doc();
    const existing = id ? await posterRef.get() : null;
    if (id && !existing?.exists) {
      return NextResponse.json({ error: "This poster no longer exists. Refresh the list and try again." }, { status: 404 });
    }

    const document = {
      title,
      imageUrl,
      imageStoragePath,
      imageAlt,
      buttonText,
      targetUrl,
      displayOrder,
      isPublished,
      createdAt: existing?.data()?.createdAt || FieldValue.serverTimestamp(),
      createdBy: existing?.data()?.createdBy || admin.email,
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: admin.email,
    };

    await posterRef.set(document);
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      poster: serializePoster(posterRef.id, document as unknown as FirebaseFirestore.DocumentData),
    });
  } catch (error) {
    console.error("[mobile-posters POST]", error);
    return NextResponse.json({ error: "Poster could not be saved. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Administrator access required." }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id")?.trim() || "";
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(id)) {
    return NextResponse.json({ error: "A valid poster ID is required." }, { status: 400 });
  }

  try {
    const posterRef = adminDb.collection("mobilePosters").doc(id);
    const snapshot = await posterRef.get();
    if (!snapshot.exists) {
      return NextResponse.json({ error: "Poster not found." }, { status: 404 });
    }
    await posterRef.delete();
    revalidatePath("/");
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("[mobile-posters DELETE]", error);
    return NextResponse.json({ error: "Poster could not be deleted. Please try again." }, { status: 500 });
  }
}
