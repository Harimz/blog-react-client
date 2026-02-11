import { getCategories } from "@/modules/categories/api/categories-client";
import { categoryKeys } from "@/modules/categories/api/categories-keys";
import { getPosts } from "@/modules/home/api/home-client";
import { homeKeys } from "@/modules/home/api/keys";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { createFileRoute } from "@tanstack/react-router";

const API_URL = import.meta.env.VITE_API_URL as string;

const apiFetch = async (input: string, init?: RequestInit) => {
  const url = input.startsWith("http") ? input : `${API_URL}${input}`;
  return fetch(url, { ...init, credentials: "include" });
};

const PAGE_SIZE = 9;

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const postsInput = {
      page: 0,
      size: PAGE_SIZE,
      sortBy: "createdAt",
      sortDir: "desc",
    } as const;

    await context.queryClient.ensureQueryData({
      queryKey: homeKeys.posts(postsInput),
      queryFn: () => getPosts(apiFetch, postsInput),
    });

    await context.queryClient.ensureQueryData({
      queryKey: categoryKeys.list(),
      queryFn: () => getCategories(),
    });
  },
  component: HomeView,
});
