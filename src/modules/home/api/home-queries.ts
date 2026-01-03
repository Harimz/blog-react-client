import { useApiFetch } from "@/hooks/use-fetch";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageResponse, PostPreview } from "../domain/types";
import { homeKeys } from "./keys";
import { getPosts } from "./home-client";

type SortDir = "asc" | "desc";

export const usePosts = (
  params: {
    page?: number;
    size?: number;
    categoryId?: string;
    tagId?: string;
    sortBy?: "createdAt" | "title";
    sortDir?: SortDir;
  } = { page: 0, size: 3, sortBy: "createdAt", sortDir: "desc" }
) => {
  const apiFetch = useApiFetch();

  return useSuspenseQuery<PageResponse<PostPreview>>({
    queryKey: homeKeys.posts(params),
    queryFn: ({ queryKey }) => {
      const [, , p] = queryKey;
      return getPosts(apiFetch, p as typeof params);
    },
  });
};
