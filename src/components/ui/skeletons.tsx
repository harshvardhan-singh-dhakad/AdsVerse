import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";

/**
 * Premium Blog Card Skeleton
 * Matches the style of AdsVerse blog cards with shimmer and glassmorphism.
 */
export function BlogCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden group bg-card/40 backdrop-blur-md border-primary/10 h-full">
      {/* Thumbnail Placeholder */}
      <Skeleton className="h-64 w-full rounded-none" />
      
      <CardHeader className="space-y-4">
        {/* Meta Info (Date, Author) */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-24" />
        </div>
        
        {/* Title Placeholder */}
        <Skeleton className="h-8 w-full" />
        
        {/* Excerpt Placeholder */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[85%]" />
        </div>
      </CardHeader>
      
      <CardFooter className="mt-auto pt-6 border-t border-primary/5">
        <Skeleton className="h-4 w-32 mb-2" />
      </CardFooter>
    </Card>
  );
}

/**
 * Grid of Blog Card Skeletons
 */
export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Premium Admin Table Skeleton
 */
export function AdminTableSkeleton() {
  return (
    <div className="space-y-6 w-full animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-11 w-40 rounded-full" />
      </div>
      
      <div className="border border-primary/10 rounded-xl overflow-hidden bg-card/40 backdrop-blur-xl shadow-2xl">
        {/* Table Header Placeholder */}
        <div className="p-5 border-b border-primary/10 bg-primary/5 flex gap-4">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/6" />
          <Skeleton className="h-5 w-1/6 ml-auto" />
        </div>
        
        {/* Table Rows Placeholder */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-5 border-b border-primary/5 flex gap-6 items-center">
            <Skeleton className="h-14 w-14 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-1/2 opacity-60" />
            </div>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-24 rounded-md ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Premium Hero Section Skeleton
 */
export function HeroSkeleton() {
  return (
    <div className="py-24 text-center space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-20 w-3/4 md:h-32 rounded-2xl" />
        <Skeleton className="h-20 w-1/2 md:h-32 rounded-2xl" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-8 w-64 rounded-full" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-4 w-[60%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
      <div className="flex justify-center gap-4 pt-4">
        <Skeleton className="h-14 w-48 rounded-md" />
        <Skeleton className="h-14 w-40 rounded-md" />
      </div>
    </div>
  );
}

/**
 * Premium Service Card Skeleton
 */
export function ServiceSkeleton() {
  return (
    <Card className="bg-card/40 backdrop-blur-md border-primary/10 transition-all p-6 h-full">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <Skeleton className="h-7 w-48" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-[85%]" />
      </div>
    </Card>
  );
}
