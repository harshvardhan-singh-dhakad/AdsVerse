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
    const allowed = ADMIN_EMAILS.includes(email) || roleDoc.exists || Boolean(emailDoc?.exists) || profileDoc.data()?.role === "admin";
    return allowed ? { uid: decoded.uid, email } : null;
  } catch {
    return null;
  }
}

function text(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}
function isFirebaseImage(url: string, path: string, id: string): boolean {
  if (!url && !path) return true;
  if (!url || !path || !path.startsWith("testimonials/" + id + "/") || path.includes("..")) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === "firebasestorage.googleapis.com";
  } catch {
    return false;
  }
}
function serialize(id: string, raw: FirebaseFirestore.DocumentData) {
  return {
    id, name: String(raw.name || ""), role: String(raw.role || ""), text: String(raw.text || ""),
    initials: String(raw.initials || ""), rating: Number.isFinite(Number(raw.rating)) ? Math.min(5, Math.max(1, Math.round(Number(raw.rating)))) : 5,
    isPublished: raw.isPublished !== false, displayOrder: Number.isFinite(Number(raw.displayOrder)) ? Math.max(0, Number(raw.displayOrder)) : 0,
    photoUrl: String(raw.photoUrl || ""), photoStoragePath: String(raw.photoStoragePath || ""), photoAlt: String(raw.photoAlt || ""),
    screenshotUrl: String(raw.screenshotUrl || ""), screenshotStoragePath: String(raw.screenshotStoragePath || ""), screenshotAlt: String(raw.screenshotAlt || ""),
  };
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: "Administrator access required." }, { status: 401 });
  try {
    const snapshot = await adminDb.collection("testimonials").get();
    const testimonials = snapshot.docs.map((doc) => serialize(doc.id, doc.data())).sort((a, b) => a.displayOrder - b.displayOrder);
    return NextResponse.json({ success: true, testimonials }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[testimonials GET]", error);
    return NextResponse.json({ error: "Reviews could not be loaded." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Administrator access required." }, { status: 401 });
  try {
    const payload = await request.json() as Record<string, unknown>;
    const id = text(payload.id, 128), name = text(payload.name, 100), role = text(payload.role, 160), review = text(payload.text, 3000);
    const initials = (text(payload.initials, 3) || name.slice(0, 2)).toUpperCase();
    const photoUrl = text(payload.photoUrl, 2048), photoStoragePath = text(payload.photoStoragePath, 512), photoAlt = text(payload.photoAlt, 180);
    const screenshotUrl = text(payload.screenshotUrl, 2048), screenshotStoragePath = text(payload.screenshotStoragePath, 512), screenshotAlt = text(payload.screenshotAlt, 180);
    const rating = Number(payload.rating), displayOrder = Number(payload.displayOrder);
    if (!/^[A-Za-z0-9_-]{1,128}$/.test(id)) return NextResponse.json({ error: "A valid review ID is required." }, { status: 400 });
    if (!name || !review) return NextResponse.json({ error: "Customer name and review text are required." }, { status: 400 });
    if (photoUrl && !photoAlt) return NextResponse.json({ error: "Photo alt text is required when a customer photo is uploaded." }, { status: 400 });
    if (screenshotUrl && !screenshotAlt) return NextResponse.json({ error: "Screenshot alt text is required when a review screenshot is uploaded." }, { status: 400 });
    if (!isFirebaseImage(photoUrl, photoStoragePath, id) || !isFirebaseImage(screenshotUrl, screenshotStoragePath, id)) return NextResponse.json({ error: "Review images must use their matching Firebase Storage folder." }, { status: 400 });
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return NextResponse.json({ error: "Rating must be between 1 and 5 stars." }, { status: 400 });
    if (!Number.isInteger(displayOrder) || displayOrder < 0 || displayOrder > 100000) return NextResponse.json({ error: "Display order must be a whole number from 0 to 100,000." }, { status: 400 });
    if (typeof payload.isPublished !== "boolean") return NextResponse.json({ error: "Choose whether this review should be published." }, { status: 400 });

    const documentRef = adminDb.collection("testimonials").doc(id);
    const existing = await documentRef.get();
    const previous = existing.data() || {};
    const document = {
      name, role, text: review, initials, rating, displayOrder, isPublished: payload.isPublished,
      photoUrl, photoStoragePath, photoAlt, screenshotUrl, screenshotStoragePath, screenshotAlt,
      createdAt: previous.createdAt || FieldValue.serverTimestamp(),
      createdBy: previous.createdBy || admin.email,
      updatedAt: FieldValue.serverTimestamp(), updatedBy: admin.email,
    };
    await documentRef.set(document);
    revalidatePath("/");
    return NextResponse.json({ success: true, testimonial: serialize(id, document as unknown as FirebaseFirestore.DocumentData) });
  } catch (error) {
    console.error("[testimonials POST]", error);
    return NextResponse.json({ error: "Review could not be saved. Please check the fields and try again." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: "Administrator access required." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id")?.trim() || "";
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(id)) return NextResponse.json({ error: "A valid review ID is required." }, { status: 400 });
  try {
    const documentRef = adminDb.collection("testimonials").doc(id);
    const snapshot = await documentRef.get();
    if (!snapshot.exists) return NextResponse.json({ error: "Review not found." }, { status: 404 });
    const data = snapshot.data() || {};
    const storagePaths = [data.photoStoragePath, data.screenshotStoragePath].filter((path): path is string => typeof path === "string" && path.startsWith("testimonials/" + id + "/"));
    await documentRef.delete();
    revalidatePath("/");
    return NextResponse.json({ success: true, id, storagePaths });
  } catch (error) {
    console.error("[testimonials DELETE]", error);
    return NextResponse.json({ error: "Review could not be deleted. Please try again." }, { status: 500 });
  }
}
