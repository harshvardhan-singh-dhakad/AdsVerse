
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Insight {
  title: string;
  description: string;
}

interface AISearchInsightsProps {
  title: string;
  insights: Insight[];
  takeaways: string[];
}

export function AISearchInsights({ title, insights, takeaways }: AISearchInsightsProps) {
  return (
    <section className="py-12 bg-primary/5 border-y border-primary/10 my-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <Badge variant="outline" className="mb-4 border-accent text-accent">AI & SEARCH INSIGHTS</Badge>
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4 text-primary">{title}</h2>
            <div className="space-y-4 text-muted-foreground">
              {insights.map((insight, index) => (
                <p key={index}>
                  <strong>{insight.title}:</strong> {insight.description}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-64">
            <Card className="bg-card/50 backdrop-blur-sm p-6 border-accent/20 text-center">
              <h3 className="font-bold text-accent mb-2">Key Takeaways</h3>
              <ul className="text-sm space-y-2 list-none p-0 opacity-80">
                {takeaways.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
