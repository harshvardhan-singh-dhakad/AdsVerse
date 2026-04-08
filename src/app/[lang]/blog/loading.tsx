import { BlogGridSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div className="container mx-auto py-16 px-4">
      {/* Header Loading State */}
      <section className="text-center mb-16 space-y-4">
        <div className="flex justify-center">
            <div className="h-16 w-64 bg-primary/20 animate-pulse rounded-lg" />
        </div>
        <div className="flex justify-center">
            <div className="h-6 w-96 bg-muted animate-pulse rounded-md" />
        </div>
      </section>

      {/* Blog Grid Loading State */}
      <section className="mb-24">
        <BlogGridSkeleton count={6} />
      </section>
    </div>
  );
}
