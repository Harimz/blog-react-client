import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { usePost } from "../../api/posts-queries";
import { TipTapRenderer } from "../components/tiptap-renderer";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { PostInfoSkeleton } from "../skeletons/post-info-skeleton";
import { GeneralDisplayError } from "@/shared/ui/components/general-display-error";
import { Link } from "@tanstack/react-router";

export const PostInfoSection = ({ postId }: { postId: string }) => {
  return (
    <Suspense fallback={<PostInfoSkeleton />}>
      <ErrorBoundary
        fallbackRender={(err) => <GeneralDisplayError error={err} />}
      >
        <PostInfoSectionSuspense postId={postId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const PostInfoSectionSuspense = ({ postId }: { postId: string }) => {
  const { data: post } = usePost(postId);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative h-64 overflow-hidden md:h-96">
        <img
          src={post.coverImageUrl ?? ""}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/80 to-transparent" />
      </div>

      <article className="mx-auto -mt-20 relative z-10 max-w-3xl px-4 pb-16">
        <div className="rounded-xl bg-background p-6 shadow-xl md:p-10">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to articles
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-custom-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {post.category.name}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-custom-primary text-sm font-bold text-primary-foreground">
                {post.author.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-foreground">
                {post.author.name}
              </span>
            </div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {post.readingTime} min read
            </span>
          </div>

          <TipTapRenderer className="mt-4" value={JSON.parse(post.content)} />
        </div>
      </article>
    </div>
  );
};
