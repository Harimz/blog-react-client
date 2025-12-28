import { ApiError } from "./api-error";

const readText = async (res: Response) => {
  try {
    return await res.text();
  } catch {
    return "";
  }
};

export const readJsonSafely = async <T = unknown>(
  res: Response
): Promise<T | null> => {
  const text = await readText(res);
  if (!text) return null;

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
};

export const errorMessageFromPayload = (payload: any, fallback: string) => {
  if (!payload) return fallback;
  if (typeof payload === "string") return payload;
  if (typeof payload?.message === "string") return payload.message;
  if (typeof payload?.error === "string") return payload.error;

  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    const first = payload.errors[0];
    if (typeof first === "string") return first;
    if (typeof first?.message === "string") return first.message;
  }

  return fallback;
};

export const throwIfNotOk = async (res: Response) => {
  if (res.ok) return;

  const payload = await readJsonSafely(res);
  const fallback = res.statusText || "Request Failed";
  const msg = errorMessageFromPayload(payload, fallback);

  throw new ApiError(res.status, msg, payload);
};

export const requestJson = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> => {
  let res: Response;

  try {
    res = await fetch(input, init);
  } catch (err) {
    throw new ApiError(0, "Network error", { cause: err });
  }

  await throwIfNotOk(res);

  const payload = await readJsonSafely<T>(res);

  if (payload == null) throw new ApiError(res.status, "Empty response body");

  return payload;
};
