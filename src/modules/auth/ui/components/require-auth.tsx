import React from "react";
import { Navigate } from "@tanstack/react-router";
import { useAuth } from "@/providers/auth-provider";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { accessToken, isBootstrapped } = useAuth();

  if (!isBootstrapped) {
    return <div className="p-6">Loading...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
