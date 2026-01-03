import { PageResponse, PostPreview } from "../domain/types";

type Fetcher = (input: string, init?: RequestInit) => Promise<Response>;

export const getPosts = async (
  fetcher: Fetcher,
  input: {
    page?: number;
    size?: number;
    categoryId?: string;
    tagId?: string;
    sortBy?: "createdAt" | "title";
    sortDir?: "asc" | "desc";
  }
) => {
  const params = new URLSearchParams();
  params.set("page", String(input.page ?? 0));
  params.set("size", String(input.size ?? 9));

  const sortBy = input.sortBy ?? "createdAt";
  const sortDir = input.sortDir ?? "desc";
  params.set("sort", `${sortBy},${sortDir}`);

  if (input.categoryId) params.set("categoryId", input.categoryId);
  if (input.tagId) params.set("tagId", input.tagId);

  const res = await fetcher(`/api/v1/posts?${params.toString()}`);
  return (await res.json()) as PageResponse<PostPreview>;
};
