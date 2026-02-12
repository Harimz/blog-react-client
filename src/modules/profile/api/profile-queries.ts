import { useApiFetch } from "@/hooks/use-fetch";
import { PostPreview } from "@/modules/home/domain/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyPosts } from "./profile-client";
import { postKeys } from "@/modules/posts/api/keys";

export const useMyPosts = () => {
  const apiFetch = useApiFetch();

  return useSuspenseQuery<PostPreview[]>({
    queryKey: postKeys.my(),
    queryFn: () => getMyPosts(apiFetch),
  });
};
