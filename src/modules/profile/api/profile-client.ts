import { UserResponse } from "@/modules/auth/domain/types";
import { PostPreview } from "@/modules/home/domain/types";

type Fetcher = (input: string, init?: RequestInit) => Promise<Response>;

export const updateMyAvatar = async (apiFetch: Fetcher, avatarUrl: string) => {
  const res = await apiFetch("/api/v1/auth/me/avatar", {
    method: "PUT",
    body: JSON.stringify({ avatarUrl }),
  });

  return res.json() as Promise<UserResponse>;
};

export const getMyPosts = async (apiFetch: Fetcher) => {
  const res = await apiFetch("/api/v1/posts/myPosts", {
    method: "GET",
  });

  return (await res.json()) as PostPreview[];
};
