import { NextRequest, NextResponse } from "next/server";
import { submitUrlsToIndexNow } from "@/lib/indexnow";

export async function POST(request: NextRequest) {
  // Validate authentication status
  const token = request.cookies.get("admin_token")?.value;
  if (!token || token !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: "Invalid URLs format" }, { status: 400 });
    }

    // Await submission to ensure completion, but return a success status
    const success = await submitUrlsToIndexNow(urls);

    return NextResponse.json({ success });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[IndexNow Route] Error:", error);
    }
    // Fail silently with 200 status as per requirements
    return NextResponse.json({ success: false });
  }
}
