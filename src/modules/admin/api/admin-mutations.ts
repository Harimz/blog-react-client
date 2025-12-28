import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { categoryKeys } from "@/modules/categories/api/categories-keys";
import { createCategory } from "./admin-client";
import { ApiError } from "@/shared/api/api-error";
import type { Category } from "@/modules/categories/domain/types";
import { useApiFetch } from "@/hooks/use-fetch";

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
