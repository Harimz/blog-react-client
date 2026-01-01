import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CreatePostForm } from "../components/create-post-form";
import { useGetCategories } from "@/modules/categories/api/categories-queries";
import { useGetTags } from "@/modules/tags/api/tag-queries";
import { PreviewPost } from "../components/preview-post";

export const CreatePostSection = () => {
  return (
    <Suspense fallback="loading">
      <ErrorBoundary fallback={"Error"}>
        <CreatePostSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const CreatePostSectionSuspense = () => {
  const { data: categories } = useGetCategories();
  const { data: tags } = useGetTags();

  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <CreatePostForm categories={categories} tags={tags} />

      <PreviewPost categories={categories} tags={tags} />
    </div>
  );
};
