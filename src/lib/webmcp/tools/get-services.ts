import { DM_CATEGORIES, AI_CATEGORIES } from "@/lib/services-data";
import { WebMCPTool } from "../types";

export interface GetServicesInput {
  category?: string;
  query?: string;
}

export interface ServiceSummary {
  name: string;
  description: string;
  tags: string[];
  category: string;
  href?: string;
}

export const getServicesTool: WebMCPTool<GetServicesInput, { success: boolean; services: ServiceSummary[]; count: number }> = {
  name: "get_services",
  description: "Read-only tool that returns the list of digital marketing, SEO, paid ads, web development, WhatsApp AI bot, and n8n automation services offered by AdsVerse.",
  inputSchema: {
    type: "object",
    properties: {
      category: {
        type: "string",
        description: "Optional category filter, e.g., 'social-media', 'seo', 'content', 'paid-ads', 'ecommerce', 'email', 'design', 'web-dev', 'whatsapp-ai', 'n8n-&-workflows', 'ai-agents-&-bots'"
      },
      query: {
        type: "string",
        description: "Optional keyword to search across service names and descriptions (e.g. 'SEO', 'WhatsApp', 'Google Ads')"
      }
    }
  },
  execute: async ({ category, query }) => {
    const allCategories = [...DM_CATEGORIES, ...AI_CATEGORIES];
    let matchedServices: ServiceSummary[] = [];

    const normalizedCategory = category ? category.toLowerCase().trim() : undefined;
    const normalizedQuery = query ? query.toLowerCase().trim() : undefined;

    for (const cat of allCategories) {
      // Filter category if specified
      if (normalizedCategory && !cat.id.toLowerCase().includes(normalizedCategory) && !cat.label.toLowerCase().includes(normalizedCategory)) {
        continue;
      }

      for (const service of cat.services) {
        if (normalizedQuery) {
          const matchName = service.name.toLowerCase().includes(normalizedQuery);
          const matchDesc = service.desc.toLowerCase().includes(normalizedQuery);
          const matchTag = service.tags.some(t => t.toLowerCase().includes(normalizedQuery));
          if (!matchName && !matchDesc && !matchTag) {
            continue;
          }
        }

        matchedServices.push({
          name: service.name,
          description: service.desc,
          tags: service.tags,
          category: cat.label,
          href: service.href
        });
      }
    }

    return {
      success: true,
      services: matchedServices,
      count: matchedServices.length
    };
  }
};
