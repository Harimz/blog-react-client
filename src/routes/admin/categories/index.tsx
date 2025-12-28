import { AdminCategoriesView } from "@/modules/admin/ui/views/admin-categories-view";
import { RequireAdminAuth } from "@/modules/auth/ui/components/require-admin-auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/categories/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireAdminAuth>
      <AdminCategoriesView />
    </RequireAdminAuth>
  );
}
