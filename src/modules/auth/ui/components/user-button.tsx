import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/auth-provider";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout } from "../../api/auth-mutations";
import { useMe } from "../../api/auth-queries";

export const UserButton = () => {
  const { isBootstrapped } = useAuth();
  const { data } = useMe();
  const { mutate, isPending } = useLogout();

  if (!isBootstrapped) {
    return <Skeleton className="size-10 rounded-full" />;
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
                <Link to="/admin/categories">Categories</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/admin/tags">Tags</Link>
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
