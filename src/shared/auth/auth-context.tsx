import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthResponse } from "./types";

type AuthContextValue = {
  accessToken: string | null;
  isBootstrapped: boolean;
  setAccessToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const API_URL = import.meta.env.VITE_API_URL as string;

async function safeJson<T>(res: Response): Promise<T> {
  const text = await res.text();

  if (!text) return {} as T;

  return JSON.parse(text) as T;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isBootstrapped, setIsBootstrapped] = useState(false);

  const refresh = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        setAccessToken(null);
        return null;
      }

      const data = await safeJson<AuthResponse>(res);
      setAccessToken(data.token);
      return data.token;
    } finally {
      setIsBootstrapped(true);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid email or password");
    }

    const data = await safeJson<AuthResponse>(res);
    setAccessToken(data.token);
  };

  const logout = async () => {
    await fetch(`${API_URL}/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {});

    setAccessToken(null);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      isBootstrapped,
      setAccessToken,
      login,
      logout,
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
