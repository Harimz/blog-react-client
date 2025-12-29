import { useSuspenseQuery } from "@tanstack/react-query";
import { getTags } from "./tag-client";
import { tagKeys } from "./tag-keys";
import { TagsResponse } from "../domain/types";

export function useGetTags() {
  return useSuspenseQuery<TagsResponse>({
    queryKey: tagKeys.list(),
    queryFn: getTags,
  });
}
