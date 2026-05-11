import { AdminTableSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div className="container mx-auto py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <AdminTableSkeleton />
      </div>
    </div>
  );
}
