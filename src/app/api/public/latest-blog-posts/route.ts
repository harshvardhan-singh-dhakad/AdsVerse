import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/admin";

export const runtime = "nodejs";
export const revalidate = 300;

export async function GET() {
  try {
    const now = new Date().toISOString();
    const snapshot = await adminDb.collection("public_blogPosts")
      .where("publishedDate", "<=", now)
      .orderBy("publishedDate", "desc")
      .limit(2)
      .get();

    const posts = snapshot.docs.map((document) => {
      const data = document.data();
      return {
        id: document.id,
        title: typeof data.title === "string" ? data.title : "",
        slug: typeof data.slug === "string" ? data.slug : "",
        imageUrl: typeof data.imageUrl === "string" ? data.imageUrl : "/images/og-adsverse-2026.png",
        category: typeof data.category === "string" ? data.category : "",
      };
    }).filter((post) => post.title && post.slug);

    return NextResponse.json(
      { success: true, posts },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch (error) {
    console.error("[public-latest-blog-posts]", error);
    return NextResponse.json(
      { success: false, posts: [] },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
    );
  }
}
