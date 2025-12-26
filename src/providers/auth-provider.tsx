import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { AuthResponse } from "@/modules/auth/domain/types";
import { requestJson } from "@/shared/api/http";
import { ApiError } from "@/shared/api/api-error";

type AuthContextValue = {
  accessToken: string | null;
  isBootstrapped: boolean;
  setAccessToken: (token: string | null) => void;
  refresh: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const API_URL = import.meta.env.VITE_API_URL as string;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isBootstrapped, setIsBootStrapped] = useState(false);

  const refresh = async (): Promise<string | null> => {
    try {
      const data = await requestJson<AuthResponse>(
        `${API_URL}/api/v1/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      setAccessToken(data.token);
      return data.token;
    } catch (err) {
      if (
        err instanceof ApiError &&
        (err.status === 401 || err.status === 403)
      ) {
        setAccessToken(null);
        return null;
      }

      setAccessToken(null);
      return null;
    } finally {
      setIsBootStrapped(true);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      isBootstrapped,
      setAccessToken,

      refresh,
    }),
    [accessToken, isBootstrapped]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
