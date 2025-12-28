import { useGetCategories } from "@/modules/categories/api/categories-queries";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CategoriesList } from "../components/categories-list";
import { ViewCategoriesSkeleton } from "../skeletons/view-categories-skeleton";

export const ViewCategoriesSection = () => {
  return (
    <Suspense fallback={<ViewCategoriesSkeleton />}>
      <ErrorBoundary fallback={<div>Error</div>}>
        <ViewCategoriesSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const ViewCategoriesSectionSuspense = () => {
  const { data } = useGetCategories();

  return (
    <div className="flex-1">
      <CategoriesList categories={data} />
    </div>
  );
};
