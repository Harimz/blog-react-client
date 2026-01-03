import { GeneralDisplayError } from "@/shared/ui/components/general-display-error";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { usePosts } from "../../api/home-queries";
import { HeaderCarousel } from "../components/header-carousel";
import { HeaderSectionSkeleton } from "../skeletons/header-section-skeleton";

export const HeaderSection = () => {
  return (
    <Suspense fallback={<HeaderSectionSkeleton />}>
      <ErrorBoundary
        fallbackRender={(err) => <GeneralDisplayError error={err} />}
      >
        <HeaderSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const HeaderSectionSuspense = () => {
  const { data } = usePosts({});

  return (
    <div className="max-w-560 w-[90%] mx-auto">
      <HeaderCarousel posts={data.content} />
    </div>
  );
};
