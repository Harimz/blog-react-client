import { useGetCategories } from "@/modules/categories/api/categories-queries";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ViewCategoriesSkeleton } from "../skeletons/view-categories-skeleton";
import { useGetTags } from "@/modules/tags/api/tag-queries";
import { CategoryTagList } from "../components/category-tag-list";

export const ViewTagsSection = () => {
  return (
    <Suspense fallback={<ViewCategoriesSkeleton />}>
      <ErrorBoundary fallback={<div>Error</div>}>
        <ViewTagsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const ViewTagsSectionSuspense = () => {
  const { data } = useGetTags();

  return (
    <div className="flex-1">
      <CategoryTagList items={data} type={"Tag"} />
    </div>
  );
};
