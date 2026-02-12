import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserButton } from "@/modules/auth/ui/components/user-button";
import { useAuth } from "@/providers/auth-provider";
import { Link } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { ResponsiveModal } from "./resposive-dialog";

export const Navbar = () => {
  const { accessToken, isBootstrapped } = useAuth();
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  if (!isBootstrapped)
    return (
      <nav className="w-[95%] max-w-640 px-4 py-8 mx-auto border-b-2"></nav>
    );

  return (
    <>
      <nav className="p-4 mx-auto sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="w-[95%] max-w-400 mx-auto flex items-center justify-between">
          <Link to="/">
            <h1 className="font-bold text-2xl">Logbook</h1>
          </Link>

          <div className="items-center hidden md:flex">
            <div className="flex items-center gap-4 mr-24 ">
              {accessToken && (
                <Link to="/posts/create">
                  <Button variant="primary">
                    Create <Plus />
                  </Button>
                </Link>
              )}
            </div>

            {accessToken && <UserButton />}

            {!accessToken && (
              <div className="hidden md:flex gap-4">
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
          </div>

          <Button
            size="icon"
            variant="outline"
            className="rounded-full md:hidden"
            onClick={() => setSearchModalOpen(true)}
          >
            <Search />
          </Button>
        </div>
      </nav>

      <ResponsiveModal
        title=""
        onOpenChange={setSearchModalOpen}
        open={searchModalOpen}
      >
        <div className="p-4">
          <div className="relative">
            <Input
              placeholder="Search posts..."
              className="pl-8.5 bg-gray-400/10 w-full"
            />
            <Search className="size-4 absolute left-2.5 top-2.5" />
          </div>

          <Button variant="primary" className="w-full mt-6">
            Search
          </Button>
        </div>
      </ResponsiveModal>
    </>
  );
};
