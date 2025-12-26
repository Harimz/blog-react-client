import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginForm = () => {
  return (
    <Card className="shadow-none p-4">
      <h1 className="font-semibold text-center text-2xl">Welcome Back</h1>

      <p className="text-muted-foreground text-center">
        Enter youer <span className="text-custom-primary">email</span> and
        <span className="text-custom-primary"> password</span> to access your
        account.
      </p>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="example@gmail.com" />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="*********" />
      </div>

      <p className="text-muted-foreground text-sm">
        Don't have an account?{" "}
        <span className="text-custom-primary cursor-pointer underline">
          Sign Up
        </span>
      </p>

      <Button className="cursor-pointer bg-custom-primary hover:bg-custom-primary/75">
        Login
      </Button>
    </Card>
  );
};
