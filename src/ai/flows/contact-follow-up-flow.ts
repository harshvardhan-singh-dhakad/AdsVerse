
'use server';
/**
 * @fileoverview A flow that analyzes a contact form submission and suggests
 * a follow-up email.
 */
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
    console.log("AI contact follow-up is currently disabled.");
}
