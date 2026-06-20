/**
 * IndexNow Utility Module
 * Submits updated URLs to Bing, Yahoo, DuckDuckGo, etc. via the IndexNow API.
 */

const INDEXNOW_API_URL = "https://api.indexnow.org/indexnow";
const DEFAULT_KEY = "8e9728eb6c5b47e58d50a26e0e9f20c1";

/**
 * Asynchronously submits a list of URLs to the IndexNow API.
 * Never throws errors, logs to console only in development mode.
 * 
 * @param urls List of relative or absolute URLs to submit
 * @returns Promise<boolean> indicating whether the API request succeeded
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<boolean> {
  if (!urls || urls.length === 0) {
    return false;
  }

  // Filter and normalize URLs to ensure they are full URLs starting with https://adsverse.in
  const normalizedUrls = urls
    .map(url => {
      let trimmed = url.trim();
      if (trimmed.startsWith("/")) {
        return `https://adsverse.in${trimmed}`;
      }
      return trimmed;
    })
    .filter(url => url.startsWith("https://adsverse.in"));

  if (normalizedUrls.length === 0) {
    if (process.env.NODE_ENV === "development") {
      console.log("[IndexNow] No valid adsverse.in URLs to submit.");
    }
    return false;
  }

  const apiKey = process.env.INDEXNOW_API_KEY || DEFAULT_KEY;

  const payload = {
    host: "adsverse.in",
    key: apiKey,
    keyLocation: `https://adsverse.in/${apiKey}.txt`,
    urlList: normalizedUrls,
  };

  try {
    const response = await fetch(INDEXNOW_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (process.env.NODE_ENV === "development") {
        console.error(`[IndexNow] Submission failed with status ${response.status}:`, errorText);
      }
      return false;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[IndexNow] Successfully submitted URLs:", normalizedUrls);
    }
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[IndexNow] Error during submission:", error);
    }
    // Fail silently
    return false;
  }
}
