'use server';
/**
 * @fileoverview A powerful, tool-using AI assistant for the AdsVerse website.
 * This assistant can answer questions about the company's services, contact
 * information, and social media presence.
 */

import { ai } from '@/ai/genkit';
import { getCompanyInfo, CompanyInfo } from '@/services/company-info';
import { z } from 'genkit';

const AdsVerseAssistantInputSchema = z.string();
export type AdsVerseAssistantInput = z.infer<typeof AdsVerseAssistantInputSchema>;

const ActionButtonSchema = z.object({
  label: z.string().describe('The text to display on the button. Example: "Call Now" or "Follow on Instagram".'),
  href: z.string().describe('The URL the button should link to. For phone numbers, use "tel:..." format. For social media, use the full URL.'),
});

const AdsVerseAssistantOutputSchema = z.object({
    responseText: z.string().describe("The main text-based response to the user's query."),
    actions: z.array(ActionButtonSchema).optional().describe('A list of suggested action buttons to show the user. Use this for contact numbers or social media links.'),
});
export type AdsVerseAssistantOutput = z.infer<
  typeof AdsVerseAssistantOutputSchema
>;

// Define the tool that the AI can use to get company information.
const getCompanyInfoTool = ai.defineTool(
    {
      name: 'getCompanyInfo',
      description: 'Retrieves comprehensive information about the AdsVerse company, including services offered, their descriptions, pricing, contact details, and social media links. Use this tool whenever a user asks a question about the company.',
      inputSchema: z.void(),
      outputSchema: CompanyInfo,
    },
    async () => {
      console.log('Using getCompanyInfo tool');
      return getCompanyInfo();
    }
);


export async function adsVerseAssistant(
  input: AdsVerseAssistantInput
): Promise<AdsVerseAssistantOutput> {
  return await adsVerseAssistantFlow(input);
}

const adsVerseAssistantPrompt = ai.definePrompt(
  {
    name: 'adsVerseAssistantPrompt',
    input: { schema: z.object({ query: AdsVerseAssistantInputSchema }) },
    output: { schema: AdsVerseAssistantOutputSchema },
    tools: [getCompanyInfoTool],
    prompt: `You are an expert customer service assistant for AdsVerse, a digital marketing agency.
Your tone should be friendly, helpful, and slightly informal, like a real person.
Your role is to answer user questions about the services offered by AdsVerse.

IMPORTANT INSTRUCTIONS:
- You MUST use the provided 'getCompanyInfo' tool to answer any questions about the company's services, contact info, or other details. DO NOT make up information.
- If the user asks a general greeting like "hi", "hello", etc., respond with a friendly greeting like "Hello! How can I help you with our services today?". Do not use the tool for simple greetings.
- If the user asks for a contact number, phone number, or how to call, provide the phone number in the responseText and also create ONE action button with the label "Call Now" and the href "tel:+919977646156".
- If the user asks for social media links (like Instagram, Facebook, LinkedIn, X/Twitter, or WhatsApp), provide the links in the responseText and also create corresponding action buttons for each platform.
  - WhatsApp: { label: 'Chat on WhatsApp', href: 'https://wa.me/919977646156' }
  - Instagram: { label: 'Follow on Instagram', href: 'https://www.instagram.com/adsverse.ai?igsh=bnl2aTJqZjB4Nm4=' }
  - Facebook: { label: 'Find us on Facebook', href: 'https://www.facebook.com/share/1E56NG5ZZL/' }
  - LinkedIn: { label: 'Connect on LinkedIn', href: 'https://www.linkedin.com/company/dmafia/' }
  - X (Twitter): { label: 'Follow on X', href: 'https://x.com/Adsverse1?t=vG0NYqyjhKobVoztl4xIPw&s=09' }

User's question:
"{{{query}}}"`,
  }
);

const adsVerseAssistantFlow = ai.defineFlow(
  {
    name: 'adsVerseAssistantFlow',
    inputSchema: AdsVerseAssistantInputSchema,
    outputSchema: AdsVerseAssistantOutputSchema,
  },
  async (input) => {
    console.log(`Running flow with input: ${input}`);
    try {
      const { output } = await adsVerseAssistantPrompt({ query: input });

      if (output) {
        console.log('Flow successful, output received:', output);
        return output;
      } else {
        console.error('Flow completed but AI output was null or undefined.');
        return { responseText: "I'm sorry, I couldn't generate a response. Please try rephrasing your question." };
      }
    } catch (error) {
      console.error('An error occurred in the adsVerseAssistantFlow:', error);
      return { responseText: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment." };
    }
  }
);
