'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing new contact submissions
 * and generating a follow-up task for the team.
 *
 * - analyzeContactRequest - A function that analyzes the contact message and suggests a task.
 * - ContactAnalysisInput - The input type for the analyzeContactRequest function.
 * - ContactAnalysisOutput - The return type for the analyzeContactRequest function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ContactAnalysisInputSchema = z.object({
  name: z.string().describe('The name of the person who submitted the form.'),
  email: z.string().describe('The email address of the person.'),
  message: z.string().describe("The user's original message from the contact form."),
});
export type ContactAnalysisInput = z.infer<typeof ContactAnalysisInputSchema>;

const ContactAnalysisOutputSchema = z.object({
  analysis: z.string().describe('A brief, one-sentence summary of the user\'s request.'),
  suggestedTask: z.string().describe('A clear, actionable follow-up task for the sales team.'),
  urgency: z.enum(['High', 'Medium', 'Low']).describe('The urgency level of the request.'),
});
export type ContactAnalysisOutput = z.infer<typeof ContactAnalysisOutputSchema>;


export async function analyzeContactRequest(input: ContactAnalysisInput): Promise<ContactAnalysisOutput> {
  return contactFollowUpFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contactFollowUpPrompt',
  input: { schema: ContactAnalysisInputSchema },
  output: { schema: ContactAnalysisOutputSchema },
  prompt: `You are an expert sales assistant for "AdsVerse", a digital marketing agency.
  Your job is to analyze incoming contact form submissions and create a clear, actionable task for the sales team.

  Read the user's message carefully and determine their primary interest and urgency.

  - **analysis**: Provide a very brief, one-sentence summary of what the user wants.
  - **suggestedTask**: Create a specific follow-up task. For example, "Schedule a call to discuss SEO packages" or "Send a portfolio for web design".
  - **urgency**: Set the urgency to 'High' if the user mentions a deadline or seems ready to buy. Set it to 'Medium' for general inquiries. Set it to 'Low' for vague requests.

  **Contact Details:**
  Name: {{{name}}}
  Email: {{{email}}}

  **User's Message:**
  "{{{message}}}"
  `,
});

const contactFollowUpFlow = ai.defineFlow(
  {
    name: 'contactFollowUpFlow',
    inputSchema: ContactAnalysisInputSchema,
    outputSchema: ContactAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
