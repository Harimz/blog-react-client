import { Skeleton } from "@/components/ui/skeleton";
import { Ellipsis } from "lucide-react";
import React from "react";

export const ViewCategoriesSkeleton = () => {
  return (
    <div className="flex-1 p-4">
      <h1 className="font-extralight">Existing Categories</h1>

      <ul className="mt-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between py-4 border-b-2">
            <Skeleton className="h-4 w-62" />

            <Ellipsis />
          </div>
        ))}
      </ul>
    </div>
  );
};
