import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostResponse } from "../domain/types";
import { ApiError } from "@/shared/api/api-error";
import { CreatePostValues } from "../domain/create-post-schema";
import { createPost, updatePost } from "./posts-client";
import toast from "react-hot-toast";
import { useApiFetch } from "@/hooks/use-fetch";
import { UpdatePostValues } from "../domain/update-post-schema";
import { postKeys } from "./keys";

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

export const useUpdatePost = (id: string) => {
  const apiFetch = useApiFetch();
  const qc = useQueryClient();

  return useMutation<PostResponse, ApiError, UpdatePostValues>({
    mutationFn: (input) => updatePost(apiFetch, input, id),
    onSuccess: (updated) => {
      qc.setQueryData(postKeys.detail(updated.id), updated);

      qc.invalidateQueries({ queryKey: postKeys.lists() });

      toast.success("Post updated");
    },
    onError: (err) => toast.error(err.message),
  });
};
