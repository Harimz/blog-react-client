import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { categorySchema } from "../../domain/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateCategory } from "../../api/admin-mutations";
import { Spinner } from "@/components/ui/spinner";

export const CreateCategoryForm = () => {
  const { mutate, isPending } = useCreateCategory();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof categorySchema>) => {
    mutate(values);
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Create a new Category</CardTitle>

        <CardDescription>
          Categories are attached to posts to aid in filtering and description
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Name</FieldLabel>

                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Lifestyle"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button variant="primary" className="w-full mt-4">
            {isPending ? <Spinner /> : "Save"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
