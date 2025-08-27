
'use server';
/**
 * @fileoverview A service assistant flow that can answer questions about
 * the company's services.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ServiceAssistantInputSchema = z.string();
export type ServiceAssistantInput = z.infer<typeof ServiceAssistantInputSchema>;

const ServiceAssistantOutputSchema = z.string();
export type ServiceAssistantOutput = z.infer<
  typeof ServiceAssistantOutputSchema
>;

export async function serviceAssistant(
  input: ServiceAssistantInput
): Promise<ServiceAssistantOutput> {
  return await serviceAssistantFlow(input);
}

const serviceAssistantPrompt = ai.definePrompt(
  {
    name: 'serviceAssistantPrompt',
    input: { schema: z.object({ servicePages: z.string(), query: z.string() }) },
    output: { schema: ServiceAssistantOutputSchema },
    prompt: `You are an expert at AdsVerse, a digital marketing agency.
Your role is to answer user questions about the services offered by AdsVerse.
You will be provided with the content of all the service pages from the AdsVerse website.
Use this content to answer the user's questions in a helpful, friendly, and professional manner.

You MUST ONLY use the provided information to answer questions. Do not make up any information.
If the answer is not in the provided text, say "I'm sorry, I don't have information about that. You can find more details on our services page or contact us directly."

Here is the content of the AdsVerse services pages:
---
{{{servicePages}}}
---

User's question:
"{{query}}"`,
  }
);

const serviceAssistantFlow = ai.defineFlow(
  {
    name: 'serviceAssistantFlow',
    inputSchema: ServiceAssistantInputSchema,
    outputSchema: ServiceAssistantOutputSchema,
  },
  async (input) => {
    const servicePageContent = await getServicePageContent();
    const { output } = await serviceAssistantPrompt({
      servicePages: servicePageContent,
      query: input,
    });
    return output ?? "I'm sorry, I'm having trouble finding that information right now.";
  }
);

// This is a placeholder function. In a real app, you would fetch this content
// from a CMS, a database, or by scraping the live website.
async function getServicePageContent(): Promise<string> {
    const services = [
        {
            title: "Custom Automation Tools",
            content: `Unlock Peak Efficiency with Automation. Our Custom Automation Tools service is designed to create bespoke software bots and workflows that streamline your operations. We automate tasks like data entry, report generation, customer inquiries, and social media interactions. Our process includes consultation, workflow design, development, rigorous testing, and deployment with full training and ongoing support.`,
        },
        {
            title: "Brand Strategy & Identity",
            content: `Brand Strategy and Identity is the soul of your business. We help define what you stand for, the promise you make to your customers, and the personality you convey. Our process is collaborative, starting with discovery, market research, and competitor analysis. We then translate this strategy into a full brand identity suite, including a logo, color palette, typography, and a comprehensive brand guidelines document.`,
        },
        {
            title: "Meta & Google Ads",
            content: `We harness the power of paid advertising on Meta (Facebook & Instagram) and Google. Google Ads captures customers at their moment of intent, while Meta Ads builds awareness. Our data-driven campaigns focus on maximizing your Return on Investment (ROI). Our process includes audience research, keyword strategy, A/B testing of ad creative, and landing page optimization. We provide continuous monitoring and transparent performance reports.`,
        },
        {
            title: "SEO Optimization",
            content: `Search Engine Optimization (SEO) is the foundation of digital visibility. We focus on the three pillars: Technical SEO (site speed, mobile-friendliness, crawlability), On-Page SEO (keyword research, high-quality content, meta tags), and Off-Page SEO (earning high-quality backlinks). Our service is a continuous process of improvement to achieve and maintain top search rankings, with detailed monthly reporting.`,
        },
        {
            title: "Content Marketing",
            content: `Content marketing builds trust and authority. We create and distribute valuable, relevant content (blog posts, articles, videos) to attract and retain your audience. Our process starts with a content strategy aligned with your business goals, including keyword research and a content calendar. We create high-quality, SEO-optimized content in your brand's voice to drive results.`,
        },
        {
            title: "Social Media Management",
            content: `We build and nurture your online community. Our service includes developing a social media strategy, creating a monthly content calendar, designing eye-catching content, daily posting, and active community management (responding to comments and messages). We provide detailed monthly performance reports to track growth and engagement.`,
        },
        {
            title: "Web Design & Development",
            content: `Your website is your digital storefront. We design and develop beautiful, functional websites that provide an exceptional user experience (UX). Our process includes discovery, planning, UI/UX design (wireframes and mockups), and development using modern technologies like Next.js. We build secure, scalable, and SEO-optimized websites and provide training for you to manage them.`,
        }
    ];

    return services.map(s => `Service: ${s.title}\nContent: ${s.content}`).join('\n\n');
}
