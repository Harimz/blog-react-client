import { Link } from "@tanstack/react-router";
import { PostPreview } from "../../domain/types";
import { useQueryClient } from "@tanstack/react-query";
import { postKeys } from "@/modules/posts/api/keys";
import { getPost } from "@/modules/posts/api/posts-client";
import PostCard from "./post-card";

interface Props {
  posts: PostPreview[];
}

export const PostsGrid = ({ posts }: Props) => {
  const qc = useQueryClient();

  const prefetchPost = (postId: string) => {
    return qc.prefetchQuery({
      queryKey: postKeys.detail(postId),
      queryFn: () => getPost(postId),
      staleTime: 60_000,
    });
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
      {posts?.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </div>
  );
};
