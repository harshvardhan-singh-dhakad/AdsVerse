import { adminAuth, adminDb } from "@/firebase/admin";

export const ADMIN_EMAILS = [
  "admin@adsverse.in",
  "harshvardhan@adsverse.in",
  "harshvardhan.dhakad@gmail.com",
  "harshvardhan.singh.dhakad@gmail.com",
];

export async function verifyAdminIdToken(idToken: string) {
  if (!idToken) {
    throw new Error("Missing idToken");
  }

  const decoded = await adminAuth.verifyIdToken(idToken);
  const uid = decoded.uid;
  const email = decoded.email ? decoded.email.toLowerCase() : "";

  const [roleAdminSnap, emailAdminSnap, profileSnap] = await Promise.all([
    adminDb.collection("roles_admin").doc(uid).get(),
    email ? adminDb.collection("admins").doc(email).get() : Promise.resolve(null),
    adminDb.collection("audit_users").doc(uid).get(),
  ]);

  const isAdmin =
    ADMIN_EMAILS.includes(email) ||
    roleAdminSnap.exists ||
    Boolean(emailAdminSnap?.exists) ||
    profileSnap.data()?.role === "admin";

  return {
    decoded,
    uid,
    email,
    isAdmin,
  };
}
