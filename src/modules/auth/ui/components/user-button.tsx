import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMe } from "../../api/use-me";
import { useAuth } from "@/providers/auth-provider";
import { useLogout } from "../../api/use-logout";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@tanstack/react-router";

export const UserButton = () => {
  const { isBootstrapped } = useAuth();
  const { data } = useMe();
  const { mutate, isPending } = useLogout();

  if (!isBootstrapped) {
    return "loading...";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer size-10">
          <AvatarImage src="/avatars/default-avatar-1.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>

        {data?.role === "ADMIN" && (
          <div>
            <DropdownMenuLabel>Admin Settings</DropdownMenuLabel>

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="/admin/categories/create">Categories</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/admin/tags/create">Tags</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => mutate()}>
          {!isPending ? "Log Out" : <Spinner />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
