import { postKeys } from "@/modules/posts/api/keys";
import { getPost } from "@/modules/posts/api/posts-client";
import { PostInfoView } from "@/modules/posts/ui/views/post-info-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ params, context }) => {
    const { postId } = params;

    await context.queryClient.ensureQueryData({
      queryKey: postKeys.detail(postId),
      queryFn: () => getPost(postId),
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();

  return <PostInfoView postId={postId} />;
}
