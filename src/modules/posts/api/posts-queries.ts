import { useSuspenseQuery } from "@tanstack/react-query";
import { PostResponse } from "../domain/types";
import { getPost } from "./posts-client";
import { ApiError } from "@/shared/api/api-error";
import { postKeys } from "./keys";

export function usePost(postId: string) {
  return useSuspenseQuery<PostResponse, ApiError>({
    queryKey: postKeys.detail(postId),
    queryFn: () => getPost(postId),
  });
}
