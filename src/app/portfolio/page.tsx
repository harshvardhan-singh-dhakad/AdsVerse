
import { PortfolioGrid } from "@/components/pages/portfolio-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | AdsVerse",
  description: "We take pride in the results we drive. Explore some of our favorite projects and case studies showcasing our digital marketing expertise.",
};

export default function PortfolioPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Our Work</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We take pride in the results we drive. Explore some of our favorite projects.
        </p>
      </section>
      
      <PortfolioGrid />
    </div>
  );
}
