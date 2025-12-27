import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogout } from "@/modules/auth/api/use-logout";
import { useMe } from "@/modules/auth/api/use-me";
import { UserButton } from "@/modules/auth/ui/components/user-button";
import { useAuth } from "@/providers/auth-provider";
import { Link } from "@tanstack/react-router";
import { Bell, Hamburger, Menu, Search } from "lucide-react";
import React from "react";

export const Navbar = () => {
  const { accessToken, isBootstrapped } = useAuth();
  const { mutate } = useLogout();
  const me = useMe();

  if (!isBootstrapped) return "Loading...";

  return (
    <nav className="w-[95%] max-w-640 p-4 mx-auto border-b-2">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Blog logo"
            className="h-10 md:h-14 w-32 md:w-42"
          />
        </Link>
        {!accessToken && (
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline" className="cursor-pointer">
                Log In
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="primary">Sign Up</Button>
            </Link>
          </div>
        )}
        {accessToken && (
          <div className="gap-4 items-center hidden md:flex">
            <div className="relative md:w-75 lg:w-100 mr-24 hidden md:block">
              <Input
                placeholder="Search posts..."
                className="pl-8.5 bg-gray-400/10 w-full"
              />
              <Search className="size-4 absolute left-2.5 top-2.5" />
            </div>

            <Button
              size="icon"
              className="rounded-full size-10"
              variant="outline"
            >
              <Bell />
            </Button>

            <UserButton />
          </div>
        )}

        <Button
          size="icon"
          variant="outline"
          className="rounded-full md:hidden"
        >
          <Search />
        </Button>
      </div>
    </nav>
  );
};
