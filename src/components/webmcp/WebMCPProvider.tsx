"use client";

import { useEffect } from "react";
import { registerWebMCP } from "@/lib/webmcp/registry";

export function WebMCPProvider() {
  useEffect(() => {
    registerWebMCP();
  }, []);

  return <></>;
}

export default WebMCPProvider;
