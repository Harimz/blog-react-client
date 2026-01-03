export const homeKeys = {
  all: ["home"] as const,
  posts: (input: unknown) => [...homeKeys.all, "posts", input] as const,
};
