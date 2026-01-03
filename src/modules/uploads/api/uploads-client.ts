import { PresignRes } from "../domain/types";

type Fetcher = (input: string, init?: RequestInit) => Promise<Response>;

export const presignPostCover = async (apiFetch: Fetcher, file: File) => {
  const res = await apiFetch("/api/v1/uploads/presign/post-cover", {
    method: "POST",
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      kind: "post-cover",
    }),
  });

  return (await res.json()) as PresignRes;
};

export const uploadToR2 = async (presign: PresignRes, file: File) => {
  await fetch(presign.uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
    body: file,
  });

  return presign.publicUrl;
};
