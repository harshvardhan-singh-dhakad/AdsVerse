import { HeroSkeleton, ServiceSkeleton } from "@/components/ui/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto px-4">
      {/* Hero Skeleton */}
      <HeroSkeleton />

      {/* Feature Section Skeleton */}
      <section className="py-12 border-y border-primary/10">
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[85%]" />
                </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-64">
                <Skeleton className="h-48 w-full rounded-xl" />
            </div>
        </div>
      </section>

      {/* Audit Tool Section Skeleton */}
      <section className="py-24">
        <Skeleton className="h-80 w-full rounded-3xl" />
      </section>

      {/* Services Grid Skeleton */}
      <section className="py-24">
        <div className="text-center mb-16 space-y-4">
            <div className="flex justify-center">
                <Skeleton className="h-10 w-64" />
            </div>
            <div className="flex justify-center">
                <Skeleton className="h-5 w-1/2" />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <ServiceSkeleton key={i} />
            ))}
        </div>
      </section>

      {/* Results Section Skeleton */}
      <section className="py-24">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
         </div>
      </section>
    </main>
  );
}
