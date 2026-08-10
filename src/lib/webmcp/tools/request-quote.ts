import { WebMCPTool } from "../types";

export interface RequestQuoteInput {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export interface RequestQuoteResponse {
  success: boolean;
  message: string;
  leadId?: string;
  error?: string;
}

export const requestQuoteTool: WebMCPTool<RequestQuoteInput, RequestQuoteResponse> = {
  name: "request_quote",
  description: "Write action tool to submit a lead inquiry or quote request to AdsVerse for digital marketing, SEO, paid ads, web development, or AI automation services.",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Full name of the user requesting the quote"
      },
      email: {
        type: "string",
        description: "Valid email address for follow-up communication"
      },
      phone: {
        type: "string",
        description: "Contact phone number (optional)"
      },
      service: {
        type: "string",
        description: "The service of interest (e.g. 'SEO Optimization', 'Meta Ads', 'WhatsApp AI Bot', 'n8n Automation', 'Web Development')"
      },
      message: {
        type: "string",
        description: "Detailed project requirements or question"
      }
    },
    required: ["name", "email", "service", "message"]
  },
  execute: async ({ name, email, phone, service, message }) => {
    try {
      if (!name || !email || !service || !message) {
        return {
          success: false,
          message: "Validation failed. Missing required fields.",
          error: "Missing required fields: name, email, service, and message are required."
        };
      }

      const { db } = await import("@/lib/firebase-server");
      const { addDoc, collection, Timestamp } = await import("firebase/firestore");

      const leadsCollection = collection(db, "leads");
      const leadData = {
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : "",
        subject: service.trim(),
        message: message.trim(),
        submissionDate: Timestamp.now(),
        submittedAt: Timestamp.now(),
        isRead: false,
        source: "webmcp_agent"
      };

      const docRef = await addDoc(leadsCollection, leadData);

      return {
        success: true,
        message: "Quote request successfully submitted to AdsVerse. Our team will contact you shortly.",
        leadId: docRef.id
      };
    } catch (err: any) {
      console.error("[WebMCP request_quote Error]:", err);
      return {
        success: false,
        message: "Failed to submit quote request due to a database error.",
        error: err?.message || "Unknown error"
      };
    }
  }
};
