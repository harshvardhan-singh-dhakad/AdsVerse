
'use server';
/**
 * @fileoverview A flow that analyzes a contact form submission and suggests
 * a follow-up email.
 */

import { ai } from '@/ai/genkit';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { z } from 'genkit';

const ContactFormInputSchema = z.object({
  contactId: z.string().describe("The ID of the contact document in Firestore."),
  name: z.string().describe("The user's name."),
  email: z.string().describe("The user's email address."),
  subject: z.string().describe("The subject or service the user is interested in."),
  message: z.string().describe("The user's message."),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactAnalysisOutputSchema = z.object({
  sentiment: z.enum(['positive', 'negative', 'neutral']).describe('The sentiment of the user\'s message.'),
  priority: z.enum(['high', 'medium', 'low']).describe('The priority level for following up with this user.'),
  suggestedReply: z.string().describe('A personalized, professional follow-up email draft based on the user\'s message. The email should be friendly, address their query, and suggest the next step (e.g., a meeting).'),
});
export type ContactAnalysisOutput = z.infer<typeof ContactAnalysisOutputSchema>;


export async function contactFollowUp(
  input: ContactFormInput
): Promise<void> {
  await contactFollowUpFlow(input);
}

const contactAnalysisPrompt = ai.definePrompt({
  name: 'contactAnalysisPrompt',
  input: { schema: ContactFormInputSchema },
  output: { schema: ContactAnalysisOutputSchema },
  prompt: `You are an expert sales and customer service assistant for AdsVerse, a digital marketing agency.
Your task is to analyze a new contact form submission and prepare a response.

Analyze the user's message for sentiment and urgency to determine a priority level.
- High priority: User is ready to buy, has a clear project, or is facing a critical issue.
- Medium priority: User is asking for quotes, details, or comparing services.
- Low priority: General inquiry, partnership offer, or unclear request.

Then, draft a personalized, professional, and friendly follow-up email.
The email should:
1.  Thank the user for their interest.
2.  Acknowledge their specific request or question from their message.
3.  Provide a brief, relevant piece of information or confirm understanding.
4.  Suggest a clear next step, like scheduling a brief call to discuss further.
5.  Be signed off by "The AdsVerse Team".

User Information:
Name: {{{name}}}
Email: {{{email}}}
Service of Interest: {{{subject}}}
Message:
{{{message}}}
`,
});

const contactFollowUpFlow = ai.defineFlow(
  {
    name: 'contactFollowUpFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    try {
      const { output } = await contactAnalysisPrompt(input);

      if (output) {
        const contactRef = doc(db, 'contacts', input.contactId);
        await updateDoc(contactRef, {
            analysisStatus: 'complete',
            analysis: output,
        });
        console.log(`Successfully analyzed contact ${input.contactId}`);
      } else {
         throw new Error("AI analysis did not produce an output.");
      }

    } catch (error) {
        console.error(`Failed to analyze contact ${input.contactId}:`, error);
        const contactRef = doc(db, 'contacts', input.contactId);
        await updateDoc(contactRef, {
            analysisStatus: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error during analysis'
        });
    }
  }
);
