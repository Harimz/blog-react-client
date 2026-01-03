import { useWatch } from "react-hook-form";
import { CreatePostValues } from "../../domain/create-post-schema";
import { useMe } from "@/modules/auth/api/auth-queries";
import { Clock, Dot, Tag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TipTapRenderer } from "./tiptap-renderer";
import { CategoriesResponse } from "@/modules/categories/domain/types";
import { TagsResponse } from "@/modules/tags/domain/types";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  categories: CategoriesResponse;
  tags: TagsResponse;
}

export const PreviewPost = ({ categories, tags }: Props) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const title = useWatch<CreatePostValues>({ name: "title" });
  const content = useWatch<CreatePostValues>({ name: "content" });
  const coverImage = useWatch<CreatePostValues>({ name: "coverImage" });
  const tagIds = useWatch<CreatePostValues>({ name: "tagIds" }) as string[];
  const categoryId = useWatch<CreatePostValues>({ name: "categoryId" });

  const { data, isPending } = useMe();

  useEffect(() => {
    if (!coverImage) return setCoverUrl(null);

    const url = URL.createObjectURL(coverImage);
    setCoverUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [coverImage]);

  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories]
  );

  const tagMap = useMemo(() => new Map(tags.map((t) => [t.id, t])), [tags]);

  const category = categoryId ? categoryMap.get(categoryId) : null;

  const selectedTags = (tagIds ?? [])
    .map((id) => tagMap.get(id))
    .filter(Boolean);

  return (
    <div className="flex-1 bg-muted/50 rounded-md p-4">
      <h1 className="font-semibold text-2xl">{title}</h1>

      {title && (
        <div className="text-sm text-muted-foreground flex items-center">
          <div className="flex items-center gap-2">
            <Avatar className="cursor-pointer size-6">
              <AvatarImage src="/avatars/default-avatar-1.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p className="mt-2">{data?.name}</p>
          </div>

          <Dot className="mt-0.5" />

          <div className="flex gap-2 mt-2">
            <p>Now</p>
            <Clock className="size-4" />
          </div>
        </div>
      )}

      <div
        className={cn("flex gap-4", (!!category || !!selectedTags) && "mt-2")}
      >
        {category && (
          <div className="bg-custom-primary text-white px-2 py-1 text-xs rounded-full w-20 font-bold text-center h-6 flex items-center justify-center">
            {category.name}
          </div>
        )}

        {selectedTags.length !== 0 && (
          <div className="flex gap-4">
            {selectedTags.map((tag) => (
              <div
                key={tag?.id}
                className="h-6 w-20 px-2 py-1 text-xs bg-muted rounded-full flex items-center justify-center gap-2"
              >
                <Tag className="size-3" />
                {tag?.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {coverUrl && <img src={coverUrl} className="w-full rounded-md my-4" />}

      <TipTapRenderer value={content as any} className="mt-4" />
      {/* render tiptap JSON/HTML */}
      {/* coverImage preview via URL.createObjectURL(coverImage) */}
    </div>
  );
};
