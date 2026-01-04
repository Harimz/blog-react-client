import { PostInfoView } from "@/modules/posts/ui/views/post-info-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();

  return <PostInfoView postId={postId} />;
}
