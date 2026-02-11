import { Skeleton } from "@/components/ui/skeleton";

export const PostInfoSkeleton = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative h-64 overflow-hidden md:h-96">
        <Skeleton className="h-full w-full" />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/40 to-transparent" />
      </div>

      <article className="mx-auto -mt-20 relative z-10 max-w-3xl px-4 pb-16">
        <div className="rounded-xl bg-background p-6 shadow-xl md:p-10 space-y-6">
          <Skeleton className="h-4 w-28" />

          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-2/3" />
          </div>

          <div className="flex flex-wrap items-center gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[92%]" />
          </div>
        </div>
      </article>
    </div>
  );
};
