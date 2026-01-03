import * as z from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  categoryId: z.string().uuid("Pick a category"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  tagIds: z.array(z.string()).max(10, "Max 10 tags"),
  content: z.any().refine((v) => v != null, "Content is required"),
  coverImage: z.instanceof(File).nullable().optional(),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;
