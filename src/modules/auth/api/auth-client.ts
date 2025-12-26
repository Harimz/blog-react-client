import { requestJson } from "@/shared/api/http";
import type { AuthResponse, UserResponse } from "@/shared/auth/types";

const API_URL = import.meta.env.VITE_API_URL as string;

export function registerUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  return requestJson<UserResponse>(`${API_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
}

export function loginUser(input: { email: string; password: string }) {
  return requestJson<AuthResponse>(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
}
