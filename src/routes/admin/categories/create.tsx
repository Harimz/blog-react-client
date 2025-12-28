import { RequireAdminAuth } from "@/modules/auth/ui/components/require-admin-auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/categories/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RequireAdminAuth>Hello "/admin/categories/create"!</RequireAdminAuth>;
}
