import { useAuth } from "../auth/auth-context";
import { ApiError } from "./api-error";
import { throwIfNotOk } from "./http";

const API_URL = import.meta.env.VITE_API_URL as string;

export const useApiFetch = () => {
  const { accessToken, refresh } = useAuth();

  return async (input: string, init?: RequestInit) => {
    const url = input.startsWith("http") ? input : `${API_URL}${input}`;

    const doRequest = async (token: string | null) => {
      const headers = new Headers(init?.headers);
      if (!headers.has("Content-Type") && init?.body) {
        headers.set("Content-Type", "application/json");
      }

      if (token) headers.set("Authorization", `Bearer ${token}`);

      const res = await fetch(url, {
        ...init,
        headers,
        credentials: "include",
      });

      await throwIfNotOk(res);
      return res;
    };

    try {
      return await doRequest(accessToken);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        const newToken = await refresh();

        if (!newToken) throw err;
        return await doRequest(newToken);
      }

      throw err;
    }
  };
};
