export const homeKeys = {
  all: ["home"] as const,
  posts: (params: {
    page?: number;
    size?: number;
    categoryId?: string;
    tagId?: string;
    sortBy?: "createdAt" | "title";
    sortDir?: "asc" | "desc";
  }) => [...homeKeys.all, "posts", params] as const,
};
