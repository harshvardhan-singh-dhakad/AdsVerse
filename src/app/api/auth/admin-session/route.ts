import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/firebase/admin";
import { verifyAdminIdToken } from "@/lib/admin-auth";

const COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE = 5 * 24 * 60 * 60;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE,
};

export async function POST(req: NextRequest) {
  try {
    const { idToken } = (await req.json()) as { idToken?: string };
    const context = await verifyAdminIdToken(idToken || "");

    if (!context.isAdmin) {
      return NextResponse.json({ error: "Administrator access required" }, { status: 403 });
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken as string, {
      expiresIn: SESSION_MAX_AGE * 1000,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        uid: context.uid,
        email: context.email,
        role: "admin",
      },
    });

    response.cookies.set(COOKIE_NAME, sessionCookie, cookieOptions);
    response.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    console.error("[/api/auth/admin-session] POST error:", error);
    return NextResponse.json(
      { error: error?.message || "Unable to create administrator session" },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
