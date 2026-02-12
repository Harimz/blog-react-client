import { useApiFetch } from "@/hooks/use-fetch";
import { UserResponse } from "@/modules/auth/domain/types";
import {
  presignAvatar,
  uploadToR2,
} from "@/modules/uploads/api/uploads-client";
import { ApiError } from "@/shared/api/api-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyAvatar } from "./profile-client";
import { authKeys } from "@/modules/auth/api/auth-keys";
import toast from "react-hot-toast";

export const useUpdateAvatar = () => {
  const apiFetch = useApiFetch();
  const qc = useQueryClient();

  return useMutation<UserResponse, ApiError, { file: File }>({
    mutationFn: async ({ file }) => {
      const presign = await presignAvatar(apiFetch, file);
      const avatarUrl = await uploadToR2(presign, file);
      const res = await updateMyAvatar(apiFetch, avatarUrl);
      return res;
    },

    onSuccess: ({ avatarUrl }) => {
      qc.setQueryData(authKeys.me(), (old: UserResponse) =>
        old ? { ...old, avatarUrl } : old,
      );

      toast.success("Avatar updated");
    },

    onError: (error) => toast.error(error.message),
  });
};
