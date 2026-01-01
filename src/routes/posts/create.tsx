import { CreatePostView } from "@/modules/posts/ui/views/create-post-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreatePostView />;
}
