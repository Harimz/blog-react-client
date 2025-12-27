import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, LogOut, Menu, Settings, User, UserPlus, X } from "lucide-react";
import { useState } from "react";

export const MobileFabMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed right-6 bottom-6 md:hidden">
      {!menuOpen && (
        <Button
          className="fixedrounded-md"
          variant="outline"
          size="icon"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="text-custom-primary size-6" />
        </Button>
      )}

      {menuOpen && (
        <Card className="shadow-none w-42 p-4 rounded-sm grid grid-cols-3">
          <div className="text-muted-foreground justify-center gap-1  flex flex-col items-center">
            <LogIn className="size-4" />
            <p className="text-xs">Login</p>
          </div>

          <div className="text-muted-foreground justify-center gap-1  flex flex-col items-center">
            <UserPlus className="size-4" />
            <p className="text-xs">Register</p>
          </div>

          <div className="text-muted-foreground justify-center gap-1  flex flex-col items-center">
            <User className="size-4" />
            <p className="text-xs">Profile</p>
          </div>

          <div className="text-muted-foreground justify-center gap-1  flex flex-col items-center">
            <Settings className="size-4" />
            <p className="text-xs">Settings</p>
          </div>

          <div className="text-muted-foreground justify-center gap-1  flex flex-col items-center">
            <LogOut className="size-4" />
            <p className="text-xs">Logout</p>
          </div>

          <div
            className="text-muted-foreground justify-center gap-1  flex flex-col items-center"
            onClick={() => setMenuOpen(false)}
          >
            <X className="size-4" />
          </div>
        </Card>
      )}
    </div>
  );
};
