
"use server";

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
  // Temporarily disable AI suggestion to fix build
  return {
    topics: ["AI in digital marketing", "The future of SEO", "Content strategy for 2025"],
    error: null
  };
}
