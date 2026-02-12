export const postKeys = {
  all: ["posts"] as const,

  lists: () => [...postKeys.all, "list"] as const,

  my: () => [...postKeys.all, "my"] as const,

  detail: (postId: string) => [...postKeys.all, "detail", postId] as const,
};
