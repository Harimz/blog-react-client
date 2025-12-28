import { API_URL } from "@/shared/api/api-url";
import { requestJson } from "@/shared/api/http";
import type { CategoriesResponse } from "../domain/types";

export const getCategories = () => {
  return requestJson<CategoriesResponse>(`${API_URL}/api/v1/categories`, {
    method: "GET",
  });
};
