import { useMutation } from "@tanstack/react-query";
import { PostResponse } from "../domain/types";
import { ApiError } from "@/shared/api/api-error";
import { CreatePostValues } from "../domain/create-post-schema";
import { createPost } from "./posts-client";
import toast from "react-hot-toast";
import { useApiFetch } from "@/hooks/use-fetch";

export const useCreatePost = () => {
  const apiFetch = useApiFetch();

  return useMutation<
    PostResponse,
    ApiError,
    CreatePostValues & { coverImageUrl: string | null }
  >({
    mutationFn: (input) => createPost(apiFetch, input),
    onSuccess: () => {
      toast.success("Post created");
    },
    onError: (err) => toast.error(err.message),
  });
};
