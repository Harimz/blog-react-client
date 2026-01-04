import { Link } from "@tanstack/react-router";
import { PostPreview } from "../../domain/types";
import { useQueryClient } from "@tanstack/react-query";
import { postKeys } from "@/modules/posts/api/keys";
import { getPost } from "@/modules/posts/api/posts-client";

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
        <Link
          to="/posts/$postId"
          params={{ postId: String(post.postId) }}
          key={post.postId}
          onMouseEnter={() => prefetchPost(String(post.postId))}
          onFocus={() => prefetchPost(String(post.postId))}
        >
          <article className="overflow-hidden rounded-xl border bg-card">
            <div
              className="h-120 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${post.coverImageUrl})` }}
            />
            <div className="p-4 space-y-2">
              <div className="text-xs text-muted-foreground">
                {post.category?.name} •{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </div>

              <h3 className="font-semibold leading-snug line-clamp-2">
                {post.title}
              </h3>

              <div className="flex flex-wrap gap-2 pt-1">
                {post.tags?.slice(0, 3).map((t) => (
                  <span
                    key={t.id}
                    className="text-xs rounded-full border px-2 py-0.5 text-muted-foreground"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};
