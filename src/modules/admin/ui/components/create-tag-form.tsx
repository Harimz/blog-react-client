import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTagsSchema } from "../../domain/tag-schema";
import { useCreateTag } from "../../api/admin-mutations";
import { Spinner } from "@/components/ui/spinner";

export const CreateTagForm = () => {
  const form = useForm<z.infer<typeof createTagsSchema>>({
    resolver: zodResolver(createTagsSchema),
    defaultValues: {
      names: "",
    },
  });
  const { mutate, isPending } = useCreateTag();

  const handleSubmit = (values: z.infer<typeof createTagsSchema>) => {
    mutate(values);
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Create a new Tag</CardTitle>

        <CardDescription>
          Tags are attached to posts and provide additional information
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Controller
            name="names"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Name</FieldLabel>

                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter tag name..."
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            variant="primary"
            className="w-full mt-4"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Save"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
