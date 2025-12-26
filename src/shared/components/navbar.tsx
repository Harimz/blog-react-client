import { Button } from "@/components/ui/button";
import { useLogout } from "@/modules/auth/api/use-logout";
import { useMe } from "@/modules/auth/api/use-me";
import { useAuth } from "@/providers/auth-provider";
import { Link } from "@tanstack/react-router";
import React from "react";

export const Navbar = () => {
  const { accessToken, isBootstrapped } = useAuth();
  const { mutate } = useLogout();
  const me = useMe();

  if (!isBootstrapped) return "Loading...";

  return (
    <nav className="w-[95%] max-w-640 p-4 mx-auto">
      <div className="flex items-center justify-between">
        <h1>Blog</h1>

        {!accessToken && (
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>

            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}

        {accessToken && <Button onClick={() => mutate()}>Logout</Button>}
      </div>
    </nav>
  );
};
