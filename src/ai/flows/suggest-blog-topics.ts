'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant blog topics based on current SEO trends and keywords.
 *
 * - suggestBlogTopics - A function that suggests blog topics based on SEO trends and keywords.
 * - SuggestBlogTopicsInput - The input type for the suggestBlogTopics function.
 * - SuggestBlogTopicsOutput - The return type for the suggestBlogTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBlogTopicsInputSchema = z.object({
  seoTrends: z
    .string()
    .describe(
      'Current SEO trends, provided as a string. For example, "AI, machine learning, digital marketing".'
    ),
  keywords: z
    .string()
    .describe(
      'Relevant keywords for the blog, provided as a string. For example, "marketing agency, social media, content strategy".'
    ),
});
export type SuggestBlogTopicsInput = z.infer<typeof SuggestBlogTopicsInputSchema>;

const SuggestBlogTopicsOutputSchema = z.object({
  suggestedTopics: z
    .array(z.string())
    .describe('An array of suggested blog topics.'),
});
export type SuggestBlogTopicsOutput = z.infer<typeof SuggestBlogTopicsOutputSchema>;

export async function suggestBlogTopics(input: SuggestBlogTopicsInput): Promise<SuggestBlogTopicsOutput> {
  return suggestBlogTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBlogTopicsPrompt',
  input: {schema: SuggestBlogTopicsInputSchema},
  output: {schema: SuggestBlogTopicsOutputSchema},
  prompt: `You are a content strategist for a digital marketing agency. Your task is to suggest relevant blog topics based on current SEO trends and keywords.

  SEO Trends: {{{seoTrends}}}
  Keywords: {{{keywords}}}

  Suggest at least 3 blog topics that would be relevant and engaging for the agency's target audience. Return the topics in a JSON array.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const suggestBlogTopicsFlow = ai.defineFlow(
  {
    name: 'suggestBlogTopicsFlow',
    inputSchema: SuggestBlogTopicsInputSchema,
    outputSchema: SuggestBlogTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
