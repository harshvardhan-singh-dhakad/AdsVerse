import { WebMCPTool } from "../types";

export interface AgencyInfo {
  name: string;
  tagline: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  operatingHours: string;
  coreServices: string[];
  founder: string;
}

export const getAgencyInfoTool: WebMCPTool<Record<string, never>, { success: boolean; agency: AgencyInfo }> = {
  name: "get_agency_info",
  description: "Read-only tool that provides overview information about AdsVerse agency, including location, founder, core services, and contact details.",
  inputSchema: {
    type: "object",
    properties: {}
  },
  execute: async () => {
    return {
      success: true,
      agency: {
        name: "AdsVerse",
        tagline: "Automate. Elevate. Dominate.",
        description: "AdsVerse is an AI-first digital marketing agency in Indore, India specializing in n8n workflow automation, WhatsApp AI chatbots, Gemini API integrations, SEO, Meta & Google Ads, and custom Web Development for Indian SMBs and enterprises.",
        location: {
          address: "329/11, Meghdoot Nagar",
          city: "Indore",
          state: "Madhya Pradesh",
          pincode: "452011",
          country: "India"
        },
        contact: {
          phone: "+91-9685123339",
          email: "contact@adsverse.in",
          website: "https://adsverse.in"
        },
        operatingHours: "Monday to Saturday, 10:00 AM - 7:00 PM IST",
        coreServices: [
          "n8n Workflow Automation",
          "WhatsApp AI Chatbots (Meta Business API)",
          "Gemini API & LLM Integrations",
          "SEO & GEO (Generative Engine Optimization)",
          "Google & Meta Performance Ads",
          "Web Design & Next.js Development"
        ],
        founder: "Deepak Dhakad"
      }
    };
  }
};
