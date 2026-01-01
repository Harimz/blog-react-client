import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CreatePostForm } from "../components/create-post-form";
import { useGetCategories } from "@/modules/categories/api/categories-queries";
import { useGetTags } from "@/modules/tags/api/tag-queries";
import { PreviewPost } from "../components/preview-post";
import { CreatePostSkeleton } from "../skeletons/create-post-skeleton";
import { GeneralDisplayError } from "@/shared/ui/components/general-display-error";

export const CreatePostSection = () => {
  return (
    <Suspense fallback={<CreatePostSkeleton />}>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <GeneralDisplayError
            error={error}
            resetErrorBoundary={resetErrorBoundary}
          />
        )}
      >
        <CreatePostSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const CreatePostSectionSuspense = () => {
  const { data: categories } = useGetCategories();
  const { data: tags } = useGetTags();

  return (
    <div className="flex gap-4 flex-col-reverse md:flex-row">
      <CreatePostForm categories={categories} tags={tags} />

      <PreviewPost categories={categories} tags={tags} />
    </div>
  );
};
