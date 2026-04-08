import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-16 px-4">
      {/* Header Loading State */}
      <section className="text-center mb-16 space-y-4">
        <div className="flex justify-center">
          <Skeleton className="h-16 w-80" />
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-6 w-[60%]" />
        </div>
      </section>

      {/* Portfolio Grid Loading State */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="group relative overflow-hidden rounded-xl bg-card border border-primary/10 aspect-[4/3]">
             <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
