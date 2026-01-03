import { CarouselItem } from "@/components/ui/carousel";
import { PostPreview } from "../../domain/types";
import { Tag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const HeaderCarouselItem = ({
  post,
  currentIndex,
  count,
}: {
  post: PostPreview;
  currentIndex: number;
  count: number;
}) => {
  return (
    <CarouselItem className="relative w-full h-100 md:h-150 lg:h-240 overflow-hidden rounded-md mt-4 flex">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url(${post.coverImageUrl})`,
        }}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

      <div className="w-full relative text-white self-end p-6 flex justify-between">
        <div>
          <div className="flex gap-4 mb-4">
            <div className="text-sm rounded-full bg-muted/25 py-1 px-6 flex items-center justify-center">
              <p>{post.category.name}</p>
            </div>

            <div className="flex items-center gap-4">
              {post.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-2 bg-muted/20 px-2 py-0.5 rounded-full"
                >
                  <Tag className="size-4" />

                  <p className="text-sm">{tag.name}</p>
                </div>
              ))}
            </div>
          </div>

          <h1 className="font-bold text-4xl">{post.title}</h1>

          <div className="flex gap-2 mt-2">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "size-3 rounded-full border border-white/70",
                  i === currentIndex && "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar className="cursor-pointer size-10">
              <AvatarImage src="/avatars/default-avatar-1.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <h1 className="font-bold text-lg mt-2">{post.author.name}</h1>
          </div>

          <h2 className="text-muted">{post.createdAt}</h2>
        </div>
      </div>
    </CarouselItem>
  );
};
