import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { usePost } from "../../api/posts-queries";
import { TipTapRenderer } from "../components/tiptap-renderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Dot, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { PostInfoSkeleton } from "../skeletons/post-info-skeleton";
import { GeneralDisplayError } from "@/shared/ui/components/general-display-error";

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
  const { data } = usePost(postId);

  return (
    <div className="bg-muted/50 rounded-md p-4">
      <h1 className="font-semibold text-2xl">{data.title}</h1>

      <div className="text-sm text-muted-foreground flex items-center">
        <div className="flex items-center gap-2">
          <Avatar className="cursor-pointer size-6">
            <AvatarImage src="/avatars/default-avatar-1.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <p className="mt-2">{data?.author.name}</p>
        </div>

        <Dot className="mt-0.5" />

        <div className="flex gap-2 mt-2">
          <p>{new Date(data.createdAt).toLocaleDateString()}</p>
          <Clock className="size-4" />
        </div>
      </div>

      <div className={cn("flex gap-4 mt-2")}>
        <div className="bg-custom-primary text-white px-2 py-1 text-xs rounded-full w-20 font-bold text-center h-6 flex items-center justify-center">
          {data.category.name}
        </div>

        <div className="flex gap-4">
          {data.tags.map((tag) => (
            <div
              key={tag?.id}
              className="h-6 w-20 px-2 py-1 text-xs bg-muted rounded-full flex items-center justify-center gap-2"
            >
              <Tag className="size-3" />
              {tag?.name}
            </div>
          ))}
        </div>
      </div>

      <img
        src={data.coverImageUrl ? data.coverImageUrl : ""}
        className="w-full rounded-md my-4"
      />

      <TipTapRenderer className="mt-4" value={JSON.parse(data.content)} />
    </div>
  );
};
