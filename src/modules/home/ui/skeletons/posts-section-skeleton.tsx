import { Skeleton } from "@/components/ui/skeleton";

export const PostsSectionSkeleton = () => {
  return (
    <div className="max-w-560 w-[90%] mx-auto mt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-md" />
          ))}
        </div>
        <Skeleton className="h-10 w-45 rounded-md" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl border bg-card">
            <Skeleton className="h-120 w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <div className="flex flex-wrap gap-2 pt-1">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-5 w-14 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 pt-2">
        <Skeleton className="h-8 w-16 rounded-md" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-md" />
        ))}
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    </div>
  );
};
