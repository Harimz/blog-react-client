import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="w-[95%] max-w-640 p-4 mx-auto">
      <div className="flex items-center justify-between">
        <h1>Blog</h1>

        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>

          <Link to="/register">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
