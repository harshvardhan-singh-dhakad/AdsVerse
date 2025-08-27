
'use server';
/**
 * @fileoverview A flow that suggests blog topics based on SEO trends and keywords.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestBlogTopicsInputSchema = z.object({
  seoTrends: z.string().describe('Current SEO trends to consider.'),
  keywords: z.string().describe('Keywords to focus on for the blog topics.'),
});
export type SuggestBlogTopicsInput = z.infer<
  typeof SuggestBlogTopicsInputSchema
>;

const SuggestBlogTopicsOutputSchema = z
  .array(z.string())
  .describe('A list of 3-5 engaging blog topic ideas.');
export type SuggestBlogTopicsOutput = z.infer<
  typeof SuggestBlogTopicsOutputSchema
>;

export async function suggestBlogTopics(
  input: SuggestBlogTopicsInput
): Promise<SuggestBlogTopicsOutput> {
  return await suggestBlogTopicsFlow(input);
}

const suggestBlogTopicsPrompt = ai.definePrompt({
  name: 'suggestBlogTopicsPrompt',
  input: { schema: SuggestBlogTopicsInputSchema },
  output: { schema: SuggestBlogTopicsOutputSchema },
  prompt: `You are a content marketing expert for a digital marketing agency called AdsVerse.
Your task is to generate a list of 3 to 5 creative and engaging blog post titles.
The titles should be relevant to the provided keywords and incorporate the given SEO trends.
The blog topics should be interesting for small business owners and marketers.

Current SEO Trends: {{{seoTrends}}}
Keywords: {{{keywords}}}

Generate a list of 3 to 5 blog topic ideas.
`,
});

const suggestBlogTopicsFlow = ai.defineFlow(
  {
    name: 'suggestBlogTopicsFlow',
    inputSchema: SuggestBlogTopicsInputSchema,
    outputSchema: SuggestBlogTopicsOutputSchema,
  },
  async (input) => {
    const { output } = await suggestBlogTopicsPrompt(input);
    return output ?? [];
  }
);
