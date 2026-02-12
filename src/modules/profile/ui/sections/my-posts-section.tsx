import React, { Suspense } from "react";
import { useMyPosts } from "../../api/profile-queries";
import { ErrorBoundary } from "react-error-boundary";
import { GeneralDisplayError } from "@/shared/ui/components/general-display-error";
import { TabsContent } from "@/components/ui/tabs";
import { PostsGrid } from "@/modules/home/ui/components/posts-grid";

export const MyPostsSection = () => {
  return (
    <Suspense fallback="loading">
      <ErrorBoundary
        FallbackComponent={({ error, resetErrorBoundary }) => (
          <GeneralDisplayError
            error={error}
            resetErrorBoundary={resetErrorBoundary}
          />
        )}
      >
        <MyPostsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const MyPostsSectionSuspense = () => {
  const { data } = useMyPosts();

  return <PostsGrid posts={data} />;
};
