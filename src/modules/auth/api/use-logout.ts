import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "./auth-client";
import { ApiError } from "@/shared/api/api-error";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import { meKey } from "./use-me";

export const useLogout = () => {
  const { setAccessToken } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onError: (err) => {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("Something went wrong");
    },
    onSettled: () => {
      setAccessToken(null);
      qc.invalidateQueries({ queryKey: meKey });
    },
  });
};
