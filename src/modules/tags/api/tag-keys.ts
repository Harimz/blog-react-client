export const tagKeys = {
  all: ["tags"] as const,
  list: () => [...tagKeys.all, "list"] as const,
  detail: (id: number) => [...tagKeys.all, "detail", id] as const,
};
