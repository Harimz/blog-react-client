import { Category } from "@/modules/categories/domain/types";
import { AuthorResponse, TagResponse } from "@/modules/posts/domain/types";

export type PostPreview = {
  postId: string;
  title: string;
  coverImageUrl: string;
  createdAt: string;
  category: Category;
  tags: TagResponse[];
  author: AuthorResponse;
};

export type PageResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  sort?: unknown;
  pageable?: unknown;
};
