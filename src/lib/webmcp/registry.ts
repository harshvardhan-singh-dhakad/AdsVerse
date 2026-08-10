import { ModelContextAPI, WebMCPTool } from "./types";
import { getServicesTool } from "./tools/get-services";
import { requestQuoteTool } from "./tools/request-quote";
import { getAgencyInfoTool } from "./tools/get-agency-info";

const TOOLS: WebMCPTool[] = [
  getServicesTool,
  requestQuoteTool,
  getAgencyInfoTool
];

let isRegistered = false;

/**
 * Feature detects WebMCP support on document or navigator and registers tools.
 * Fails gracefully in every non-supporting environment with zero visible side effects.
 */
export function registerWebMCP(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  if (isRegistered) {
    return true;
  }

  try {
    const doc = document as any;
    const nav = navigator as any;
    const modelContext: ModelContextAPI | undefined = doc.modelContext || nav.modelContext;

    if (!modelContext) {
      if (process.env.NODE_ENV === "development") {
        console.debug("[WebMCP] document.modelContext API not available on this browser environment.");
      }
      return false;
    }

    const registerFn = modelContext.registerTool || modelContext.provideTool || modelContext.addTool;

    if (typeof registerFn === "function") {
      for (const tool of TOOLS) {
        registerFn.call(modelContext, tool);
      }
      isRegistered = true;
      if (process.env.NODE_ENV === "development") {
        console.info(`[WebMCP] Successfully registered ${TOOLS.length} WebMCP tools:`, TOOLS.map(t => t.name));
      }
      return true;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[WebMCP Registration Warning]:", error);
    }
  }

  return false;
}

export function getRegisteredTools(): WebMCPTool[] {
  return TOOLS;
}
