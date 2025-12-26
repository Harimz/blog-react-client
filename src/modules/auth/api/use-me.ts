import { useSuspenseQuery } from "@tanstack/react-query";
import type { UserResponse } from "../../../shared/auth/types";
import { useApiFetch } from "@/shared/api/api-fetch";

export const meKey = ["auth", "me"] as const;

export function useMe() {
  const apiFetch = useApiFetch();

  return useSuspenseQuery<UserResponse>({
    queryKey: meKey,
    queryFn: async () => {
      const res = await apiFetch("/api/v1/auth/me", { method: "GET" });
      return (await res.json()) as UserResponse;
    },
    staleTime: 30_000,
    retry: (count, err: any) => {
      if (err?.status === 401 || err?.status === 403) return false;
      return count < 2;
    },
    refetchOnWindowFocus: false,
  });
}
