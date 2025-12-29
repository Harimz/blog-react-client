import { API_URL } from "@/shared/api/api-url";
import { requestJson } from "@/shared/api/http";
import { TagsResponse } from "../domain/types";

export const getTags = () => {
  return requestJson<TagsResponse>(`${API_URL}/api/v1/tags`, {
    method: "GET",
  });
};
