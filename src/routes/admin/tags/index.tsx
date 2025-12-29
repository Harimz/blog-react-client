import { AdminTagView } from "@/modules/admin/ui/views/admin-tag-view";
import { RequireAdminAuth } from "@/modules/auth/ui/components/require-admin-auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/tags/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireAdminAuth>
      <AdminTagView />
    </RequireAdminAuth>
  );
}
