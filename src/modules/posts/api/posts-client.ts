import { requestJson } from "@/shared/api/http";
import { CreatePostValues } from "../domain/create-post-schema";
import { PostResponse } from "../domain/types";
import { API_URL } from "@/shared/api/api-url";

type Fetcher = (input: string, init?: RequestInit) => Promise<Response>;

export const createPost = async (
  fetcher: Fetcher,
  input: CreatePostValues & { coverImageUrl: string | null }
) => {
  const res = await fetcher("/api/v1/posts", {
    method: "POST",
    body: JSON.stringify({
      title: input.title,
      content: JSON.stringify(input.content),
      categoryId: input.categoryId,
      tagIds: input.tagIds,
      status: input.status,
      coverImageUrl: input.coverImageUrl ?? null,
    }),
  });

  return (await res.json()) as PostResponse;
};

export const getPost = (postId: string) => {
  return requestJson<PostResponse>(`${API_URL}/api/v1/posts/${postId}`, {
    method: "GET",
  });
};
