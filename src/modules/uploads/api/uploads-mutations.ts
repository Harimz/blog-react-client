import { useApiFetch } from "@/hooks/use-fetch";
import { useMutation } from "@tanstack/react-query";
import { PresignRes } from "../domain/types";
import { ApiError } from "@/shared/api/api-error";
import { presignPostCover, uploadToR2 } from "./uploads-client";
import toast from "react-hot-toast";

export const usePresignPostCover = () => {
  const apiFetch = useApiFetch();

  return useMutation<PresignRes, ApiError, { file: File }>({
    mutationFn: (input) => presignPostCover(apiFetch, input.file),

    onError: (err) => toast.error(err.message),
  });
};

export const useUploadToR2 = () => {
  return useMutation<any, ApiError, { presignRes: PresignRes; file: File }>({
    mutationFn: (input) => uploadToR2(input.presignRes, input.file),

    onError: (err) => toast.error(err.message),
  });
};
