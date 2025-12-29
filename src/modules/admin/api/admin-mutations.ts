import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { categoryKeys } from "@/modules/categories/api/categories-keys";
import {
  createCategory,
  createTag,
  deleteCategory,
  deleteTag,
  updateCategory,
} from "./admin-client";
import { ApiError } from "@/shared/api/api-error";
import type { Category } from "@/modules/categories/domain/types";
import { useApiFetch } from "@/hooks/use-fetch";
import { tagKeys } from "@/modules/tags/api/tag-keys";
import { TagsResponse } from "@/modules/tags/domain/types";

export const useCreateCategory = () => {
  const qc = useQueryClient();
  const apiFetch = useApiFetch();

  return useMutation<Category, ApiError, { name: string }>({
    mutationFn: (input) => createCategory(apiFetch, input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: categoryKeys.list() });
      toast.success("Category Created");
    },
    onError: (err) => toast.error(err.message),
  });
};

export const useUpdateCategory = () => {
  const qc = useQueryClient();
  const apiFetch = useApiFetch();

  return useMutation<Category, ApiError, { name: string; id: string }>({
    mutationFn: (input) => updateCategory(apiFetch, input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: categoryKeys.list() });
      toast.success("Category Updated");
    },
    onError: (err) => toast.error(err.message),
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();
  const apiFetch = useApiFetch();

  return useMutation<void, ApiError, { id: string }>({
    mutationFn: (input) => deleteCategory(apiFetch, input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: categoryKeys.list() });
      toast.success("Category Deleted");
    },
    onError: (err) => toast.error(err.message),
  });
};

export const useCreateTag = () => {
  const qc = useQueryClient();
  const apiFetch = useApiFetch();

  return useMutation<TagsResponse, ApiError, { names: string }>({
    mutationFn: (input) => createTag(apiFetch, input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: tagKeys.list() });
      toast.success("Tag Created");
    },
    onError: (err) => toast.error(err.message),
  });
};

export const useDeleteTag = () => {
  const qc = useQueryClient();
  const apiFetch = useApiFetch();
  return useMutation<void, ApiError, { id: string }>({
    mutationFn: (input) => deleteTag(apiFetch, input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: tagKeys.list() });
      toast.success("Tag Deleted");
    },
    onError: (err) => toast.error(err.message),
  });
};
