import { Controller, useFormContext } from "react-hook-form";
import { CreatePostValues } from "../../domain/create-post-schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Upload } from "lucide-react";
import { CategoriesResponse } from "@/modules/categories/domain/types";
import { TagsResponse } from "@/modules/tags/domain/types";
import { useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TipTapEditor } from "./tiptap-editor";
import type { JSONContent } from "@tiptap/react";
import { presignPostCover } from "@/modules/uploads/api/uploads-client";
import {
  usePresignPostCover,
  useUploadToR2,
} from "@/modules/uploads/api/uploads-mutations";
import { PresignRes } from "@/modules/uploads/domain/types";
import { useCreatePost } from "../../api/posts-mutations";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  categories: CategoriesResponse;
  tags: TagsResponse;
}

export const CreatePostForm = ({ categories, tags }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { control, handleSubmit } = useFormContext<CreatePostValues>();
  const { mutateAsync: presignPostCover, isPending: presigningCover } =
    usePresignPostCover();
  const { mutateAsync: uploadToR2, isPending: uploading } = useUploadToR2();
  const { mutate: createPost, isPending: creatingPost } = useCreatePost();

  const onSubmit = async (values: CreatePostValues) => {
    console.log(values);
    let coverImageUrl: string | null = null;

    if (values.coverImage) {
      const presign = await presignPostCover({ file: values.coverImage });
      coverImageUrl = await uploadToR2({
        presignRes: presign,
        file: values.coverImage,
      });
    }

    createPost({ ...values, coverImageUrl });
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Title</FieldLabel>

              <div className="flex gap-2">
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter title..."
                  autoComplete="off"
                />

                <Controller
                  control={control}
                  name="coverImage"
                  render={({ field: coverField }) => (
                    <>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          coverField.onChange(file);
                        }}
                      />

                      <Button
                        size="icon"
                        variant="primary"
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        title="Upload cover image"
                      >
                        <Upload className="size-4" />
                      </Button>

                      {coverField.value ? (
                        <span className="text-xs text-muted-foreground self-center">
                          {(coverField.value as File).name}
                        </span>
                      ) : null}
                    </>
                  )}
                />
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex gap-4 mt-4">
          <Controller
            control={control}
            name="categoryId"
            render={({ field, fieldState }) => (
              <Field className="flex-1" data-invalid={fieldState.invalid}>
                <FieldLabel>Category</FieldLabel>

                <Select
                  value={field.value || ""}
                  onValueChange={(val) => field.onChange(val)}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="tagIds"
            render={({ field, fieldState }) => {
              const selected = new Set(field.value ?? []);
              const selectedLabels =
                tags
                  .filter((t) => selected.has(t.id))
                  .map((t) => t.name)
                  .join(", ") || "";

              return (
                <Field className="flex-1" data-invalid={fieldState.invalid}>
                  <FieldLabel>Tags</FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-between",
                          fieldState.invalid && "border-destructive"
                        )}
                      >
                        <span className="truncate">
                          {selectedLabels || "Select tags..."}
                        </span>
                        <ChevronsUpDown className="ml-2 size-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-0 w-70" align="start">
                      <Command>
                        <CommandInput placeholder="Search tags..." />
                        <CommandEmpty>No tags found.</CommandEmpty>
                        <CommandGroup>
                          {tags.map((t) => {
                            const isSelected = selected.has(t.id);

                            return (
                              <CommandItem
                                key={t.id}
                                value={t.name}
                                onSelect={() => {
                                  const next = new Set(selected);
                                  if (next.has(t.id)) next.delete(t.id);
                                  else next.add(t.id);
                                  field.onChange(Array.from(next));
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 size-4",
                                    isSelected ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {t.name}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        </div>

        <Controller
          control={control}
          name="status"
          render={({ field, fieldState }) => (
            <Field className="flex-1 mt-4" data-invalid={fieldState.invalid}>
              <FieldLabel>Status</FieldLabel>

              <Select
                value={field.value || ""}
                onValueChange={(val) => field.onChange(val)}
                defaultValue="PUBLISHED"
              >
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={"PUBLISHED"}>Published</SelectItem>
                  <SelectItem value={"DRAFT"}>Draft</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="content"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mt-4">
              <FieldLabel>Content</FieldLabel>

              <TipTapEditor
                value={field.value as JSONContent | null}
                onChange={(json) => field.onChange(json)}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="w-full flex gap-4 items-center mt-4 justify-end">
          <Button variant="outline">Cancel</Button>

          <Button variant="primary">
            {creatingPost || uploading || presigningCover ? (
              <Spinner />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
