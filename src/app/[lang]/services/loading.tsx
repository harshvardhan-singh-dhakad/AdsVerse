import { ServiceSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="text-center mb-16 space-y-4">
        <div className="flex justify-center">
            <div className="h-12 w-96 bg-primary/20 animate-pulse rounded-lg" />
        </div>
        <div className="flex justify-center">
            <div className="h-6 w-1/2 bg-muted animate-pulse rounded-md" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
