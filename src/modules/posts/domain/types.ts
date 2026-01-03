import { Category } from "@/modules/categories/domain/types";

export type PostStatus = "DRAFT" | "PUBLISHED";

export type AuthorResponse = {
  id: string;
  name: string;
};
export type TagResponse = {
  id: string;
  name: string;
};

export type PostResponse = {
  id: string;
  title: string;
  coverImageUrl: string | null;
  content: string;
  author: AuthorResponse;
  category: Category;
  tags: TagResponse[];
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  status: PostStatus;
};
