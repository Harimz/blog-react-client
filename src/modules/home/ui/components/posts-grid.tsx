import { PostPreview } from "../../domain/types";
import PostCard from "./post-card";

interface Props {
  posts: PostPreview[];
}

export const PostsGrid = ({ posts }: Props) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
      {posts?.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </div>
  );
};
