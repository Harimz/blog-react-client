import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { LoginInput, loginSchema } from "../../domain/login-schema";
import { Link, useNavigate } from "@tanstack/react-router";
import { useLogin } from "../../api/auth-mutations";

export const LoginForm = () => {
  const { mutate, isPending, reset } = useLogin();
  const naviate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: LoginInput) => {
    reset();

    mutate(values, {
      onSuccess: () => {
        naviate({ to: "/" });
      },
    });
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="font-semibold text-center text-2xl">
          Welcome Back
        </CardTitle>

        <CardDescription className="text-muted-foreground text-center">
          Enter youer <span className="text-custom-primary">email</span> and{" "}
          <span className="text-custom-primary">password</span> to access your
          account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email</FieldLabel>

                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="example@gmail.com"
                  type="email"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password</FieldLabel>

                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="********"
                  type="password"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button className="cursor-pointer bg-custom-primary hover:bg-custom-primary/75 w-full">
            {isPending ? <Spinner /> : "Login"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Don't have an account?{" "}
          <span className="text-custom-primary cursor-pointer underline">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};
