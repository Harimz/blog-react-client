import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLogout } from "@/modules/auth/api/use-logout";
import { useAuth } from "@/providers/auth-provider";
import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, Settings, User, UserPlus, X } from "lucide-react";
import { useState } from "react";

type ItemType = {
  icon: React.ReactNode;
  text: string;
  auth: boolean;
  to?: string;
  onClick?: () => void;
};
export const MobileFabMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { accessToken } = useAuth();
  const { mutate } = useLogout();

  const loggedIn = !!accessToken;

  const items: ItemType[] = [
    {
      icon: <LogIn className="size-4" />,
      text: "Login",
      auth: false,
      to: "/login",
    },
    {
      icon: <UserPlus className="size-4" />,
      text: "Register",
      auth: false,
      to: "/register",
    },
    {
      icon: <User className="size-4" />,
      text: "Profile",
      auth: true,
      to: "/profile",
    },
    {
      icon: <Settings className="size-4" />,
      text: "Settings",
      auth: true,
      to: "/settings",
    },
    {
      icon: <LogOut className="size-4" />,
      text: "Logout",
      auth: true,
      onClick: () => mutate(),
    },
  ];

  return (
    <div className="fixed right-6 bottom-6 md:hidden">
      {!menuOpen ? (
        <Button
          className="rounded-md"
          variant="outline"
          size="icon"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="text-custom-primary size-6" />
        </Button>
      ) : (
        <Card className="shadow-none w-42 p-4 rounded-sm grid grid-cols-3 gap-3">
          {items
            .filter((item) => item.auth === loggedIn)
            .map((item) => {
              const content = (
                <>
                  {item.icon}
                  <p className="text-xs">{item.text}</p>
                </>
              );

              if (item.to) {
                return (
                  <Link
                    key={item.text}
                    to={item.to}
                    className="text-muted-foreground justify-center gap-1 flex flex-col items-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={item.text}
                  type="button"
                  className="text-muted-foreground justify-center gap-1 flex flex-col items-center"
                  onClick={() => {
                    item.onClick?.();
                    setMenuOpen(false);
                  }}
                >
                  {content}
                </button>
              );
            })}

          <button
            type="button"
            className="text-muted-foreground justify-center gap-1 flex flex-col items-center"
            onClick={() => setMenuOpen(false)}
          >
            <X className="size-4" />
            <p className="text-xs">Close</p>
          </button>
        </Card>
      )}
    </div>
  );
};
