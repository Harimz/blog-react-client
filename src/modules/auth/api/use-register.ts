import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./auth-client";
import { ApiError } from "@/shared/api/api-error";
import { toast } from "sonner";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onError: (err) => {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("Something went wrong");
    },
  });
};
