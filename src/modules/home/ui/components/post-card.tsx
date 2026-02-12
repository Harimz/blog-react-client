import { Link } from "@tanstack/react-router";
import { PostPreview } from "../../domain/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  post: PostPreview;
  index?: number;
}

const PostCard = ({ post, index = 0 }: PostCardProps) => {
  return (
    <article className="group bg-[#FBF8F3]/25 flex flex-col overflow-hidden rounded-lg border border-border transition-shadow duration-300 hover:shadow-lg">
      <Link
        to="/posts/$postId"
        params={{ postId: `${post.postId}` }}
        className="overflow-hidden"
      >
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground">
            {post.category.name}
          </span>
        </div>

        <Link to="/posts/$postId" params={{ postId: `${post.postId}` }}>
          <h3 className="font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-custom-primary">
            {post.title}
          </h3>
        </Link>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Avatar className="cursor-pointer size-8">
            <AvatarImage
              className="object-cover"
              src={
                post.author?.avatarUrl ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-foreground">
              {post.author.name}
            </span>
            <span className="text-[11px] text-muted-foreground">
              Posted on:{" "}
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
