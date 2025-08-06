"use server";

import { suggestBlogTopics } from '@/ai/flows/suggest-blog-topics';
import { z } from 'zod';

const formSchema = z.object({
  seoTrends: z.string().min(3, "Please enter some SEO trends."),
  keywords: z.string().min(3, "Please enter some keywords."),
});

type State = {
  topics: string[];
  error: string | null;
};

export async function getBlogSuggestions(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = formSchema.safeParse({
    seoTrends: formData.get('seoTrends'),
    keywords: formData.get('keywords'),
  });

  if (!validatedFields.success) {
    return {
      topics: [],
      error: validatedFields.error.flatten().fieldErrors.seoTrends?.[0] || validatedFields.error.flatten().fieldErrors.keywords?.[0] || "Invalid input.",
    };
  }

  try {
    const result = await suggestBlogTopics(validatedFields.data);
    return { topics: result.suggestedTopics, error: null };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { topics: [], error: `AI suggestion failed: ${errorMessage}` };
  }
}
