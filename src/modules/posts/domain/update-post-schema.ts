import { z } from "zod";

export const updatePostSchema = z.object({
  title: z.string().min(1, "Must provide a title"),
  content: z.any().refine((v) => v != null, "Content is required"),
});

export type UpdatePostValues = z.infer<typeof updatePostSchema>;
