import { Suspense, useState } from "react";
import { PostsQueryInput, usePosts } from "../../api/home-queries";
import { ErrorBoundary } from "react-error-boundary";
import { GeneralDisplayError } from "@/shared/ui/components/general-display-error";
import { useGetCategories } from "@/modules/categories/api/categories-queries";
import { PostFilter } from "../components/post-filter";
import { PostsGrid } from "../components/posts-grid";
import { PaginationBar } from "../components/pagination-bar";
import { PostsSectionSkeleton } from "../skeletons/posts-section-skeleton";

export const PostsSection = () => {
  return (
    <Suspense fallback={<PostsSectionSkeleton />}>
      <ErrorBoundary
        fallbackRender={(err) => <GeneralDisplayError error={err} />}
      >
        <PostsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const PAGE_SIZE = 9;

const PostsSectionSuspense = () => {
  const [query, setQuery] = useState<PostsQueryInput>({
    page: 0,
    size: PAGE_SIZE,
    sortBy: "createdAt",
    sortDir: "desc",
    categoryId: undefined,
  });

  const { data: posts } = usePosts(query);

  const { data: categories } = useGetCategories();

  const currentPage = posts.number ?? query.page ?? 0;
  const totalPages = posts.totalPages ?? 1;

  return (
    <div className="max-w-560 w-[90%] mx-auto mt-10">
      <PostFilter categories={categories} query={query} setQuery={setQuery} />

      <PostsGrid posts={posts.content} />

      <PaginationBar
        page={currentPage}
        totalPages={totalPages}
        onPageChange={(page) =>
          setQuery((prev) => ({
            ...prev,
            page,
          }))
        }
      />
    </div>
  );
};
