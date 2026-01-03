import { useApiFetch } from "@/hooks/use-fetch";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageResponse, PostPreview } from "../domain/types";
import { homeKeys } from "./keys";
import { getPosts } from "./home-client";

export type SortDir = "asc" | "desc";
export type SortBy = "createdAt" | "title";

export type PostsQueryInput = {
  page?: number;
  size?: number;
  categoryId?: string;
  tagId?: string;
  sortBy?: SortBy;
  sortDir?: SortDir;
};

export const usePosts = (input: PostsQueryInput) => {
  const apiFetch = useApiFetch();

  const normalized: Required<
    Pick<PostsQueryInput, "page" | "size" | "sortBy" | "sortDir">
  > &
    PostsQueryInput = {
    page: input.page ?? 0,
    size: input.size ?? 9,
    sortBy: input.sortBy ?? "createdAt",
    sortDir: input.sortDir ?? "desc",
    categoryId: input.categoryId,
    tagId: input.tagId,
  };

  return useSuspenseQuery<PageResponse<PostPreview>>({
    queryKey: homeKeys.posts(normalized),
    queryFn: () => getPosts(apiFetch, normalized),
  });
};
