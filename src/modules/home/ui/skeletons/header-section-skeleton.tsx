import { Skeleton } from "@/components/ui/skeleton";

export const HeaderSectionSkeleton = () => {
  return (
    <div className="max-w-560 w-[90%] mx-auto">
      <div className="relative w-full h-100 md:h-150 lg:h-240 overflow-hidden rounded-md mt-4 flex bg-muted">
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

        <div className="w-full relative self-end p-2 md:p-6 flex justify-between">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-7 w-20 rounded-full bg-white/20" />
                <Skeleton className="h-7 w-20 rounded-full bg-white/20" />
              </div>
            </div>

            <Skeleton className="h-8 md:h-10 w-64 md:w-96 bg-white/20" />

            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="size-3 rounded-full bg-white/30" />
              ))}
            </div>
          </div>

          <div className="space-y-2 hidden md:block">
            <div className="flex items-center gap-2">
              <Skeleton className="size-10 rounded-full bg-white/20" />
              <Skeleton className="h-5 w-24 bg-white/20" />
            </div>
            <Skeleton className="h-4 w-20 ml-auto bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};
