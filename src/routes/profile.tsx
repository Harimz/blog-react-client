import { RequireAuth } from "@/modules/auth/ui/components/require-auth";
import { ProfileView } from "@/modules/profile/ui/views/profile-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RequireAuth>
      <ProfileView />
    </RequireAuth>
  );
}
