import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/modules/auth/ui/components/login-form";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <LoginForm />
    </div>
  );
}
