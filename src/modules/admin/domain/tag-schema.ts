import { z } from "zod";

export const createTagsSchema = z.object({
  names: z
    .string()
    .min(2, "Tag name must be between 2 and 20 characters")
    .max(20, "Tag name must be between 2 and 20 characters")
    .regex(
      /^[\w\s-]+$/,
      "Tag name can only contain letters, numbers, and hyphens"
    )
    .transform((s) => s.trim())
    .refine(
      (s) => s.length >= 2,
      "Tag name must be between 2 and 20 characters"
    ),
});
