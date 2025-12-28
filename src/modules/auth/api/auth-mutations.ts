import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, logoutUser, registerUser } from "./auth-client";
import { ApiError } from "@/shared/api/api-error";
import { useAuth } from "@/providers/auth-provider";
import { meKey } from "./auth-queries";
import toast from "react-hot-toast";

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

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onError: (err) => {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("Something went wrong");
    },
  });
};
