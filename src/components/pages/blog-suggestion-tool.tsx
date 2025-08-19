
"use client";

import { useState, useTransition } from "react";
import { getBlogSuggestions } from "@/app/blog/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Loader2 } from "lucide-react";

type SuggestionState = {
  topics: string[];
  error: string | null;
};

const initialState: SuggestionState = {
  topics: [],
  error: null,
};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="w-full md:w-auto bg-accent hover:bg-accent/90">
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Suggest Topics"
      )}
    </Button>
  );
}

export function BlogSuggestionTool() {
  const [state, setState] = useState(initialState);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await getBlogSuggestions(state, formData);
      setState(result);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="seoTrends">Current SEO Trends</Label>
            <Textarea
              id="seoTrends"
              name="seoTrends"
              placeholder="e.g., AI in SEO, voice search, video content"
              required
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Your Keywords</Label>
            <Textarea
              id="keywords"
              name="keywords"
              placeholder="e.g., digital marketing, small business, content strategy"
              required
              className="min-h-[100px]"
            />
          </div>
        </div>
        <SubmitButton isPending={isPending} />
      </form>

      {state.error && <p className="mt-4 text-destructive">{state.error}</p>}

      {state.topics && state.topics.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Suggested Topics:</h3>
          <div className="grid grid-cols-1 gap-4">
            {state.topics.map((topic: string, index: number) => (
              <Card key={index} className="bg-background/50">
                <CardContent className="p-4 flex items-start gap-4">
                  <Lightbulb className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                  <p className="font-medium">{topic}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
