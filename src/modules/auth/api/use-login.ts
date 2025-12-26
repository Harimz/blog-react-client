import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "./auth-client";
import { ApiError } from "@/shared/api/api-error";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import { meKey } from "./use-me";

export const useLogin = () => {
  const { setAccessToken } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.token);
      qc.invalidateQueries({ queryKey: meKey });
    },
    onError: (err) => {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("Something went wrong");
    },
  });
};
