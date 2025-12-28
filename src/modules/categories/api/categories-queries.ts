import { useSuspenseQuery } from "@tanstack/react-query";
import { getCategories } from "./categories-client";
import { CategoriesResponse } from "@/modules/categories/domain/types";
import { categoryKeys } from "./categories-keys";

export function useGetCategories() {
  return useSuspenseQuery<CategoriesResponse>({
    queryKey: categoryKeys.list(),
    queryFn: getCategories,
  });
}
