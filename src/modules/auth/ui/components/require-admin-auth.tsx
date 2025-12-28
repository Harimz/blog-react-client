import React from "react";
import { Navigate, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/providers/auth-provider";
import { useMe } from "../../api/use-me";
import { Spinner } from "@/components/ui/spinner";

export const RequireAdminAuth = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { accessToken, isBootstrapped } = useAuth();
  const location = useLocation();
  const { data, isLoading, isError } = useMe();

  if (!isBootstrapped) return null;

  if (!accessToken) {
    return <Navigate to="/login" search={{ redirect: location.href }} />;
  }

  if (isLoading) return null;

  if (isError || !data) {
    return <Navigate to="/login" search={{ redirect: location.href }} />;
  }

  if (data.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
