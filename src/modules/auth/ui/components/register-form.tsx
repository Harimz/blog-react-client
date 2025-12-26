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
import { RegisterInput, registerSchema } from "../../domain/register-schema";
import { useRegister } from "../../api/use-register";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@tanstack/react-router";
import { useLogin } from "../../api/use-login";

export const RegisterForm = () => {
  const { mutate, isPending, reset } = useRegister();
  const { mutate: loginMutate, isPending: loginPending } = useLogin();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values: RegisterInput) => {
    reset();

    mutate({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
    });

    loginMutate({ email: values.email, password: values.password });
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="font-semibold text-center text-2xl">
          Create an Account
        </CardTitle>

        <CardDescription className="text-muted-foreground text-center">
          Join now to be part of the{" "}
          <span className="text-custom-primary">community</span> and share your
          <span className="text-custom-primary"> thoughts</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Name</FieldLabel>

                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

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

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Confirm Password</FieldLabel>

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
            {isPending ? <Spinner /> : "Sign Up"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-custom-primary cursor-pointer underline">
              Sign In
            </span>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
