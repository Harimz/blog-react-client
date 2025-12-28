import { useQuery } from "@tanstack/react-query";
import { useApiFetch } from "../../../hooks/use-fetch";
import { UserResponse } from "../domain/types";
import { useAuth } from "@/providers/auth-provider";

export const meKey = ["auth", "me"] as const;

export function useMe() {
  const apiFetch = useApiFetch();
  const { accessToken, isBootstrapped } = useAuth();

  return useQuery<UserResponse>({
    queryKey: meKey,
    enabled: isBootstrapped && !!accessToken,
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
