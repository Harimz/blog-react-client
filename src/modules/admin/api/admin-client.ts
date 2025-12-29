import { Category } from "@/modules/categories/domain/types";
import { TagsResponse } from "@/modules/tags/domain/types";

type Fetcher = (input: string, init?: RequestInit) => Promise<Response>;

export async function createCategory(
  fetcher: Fetcher,
  input: { name: string }
) {
  const res = await fetcher("/api/v1/categories", {
    method: "POST",
    body: JSON.stringify(input),
  });

  return (await res.json()) as Category;
}

export async function createTag(fetcher: Fetcher, input: { names: string }) {
  const res = await fetcher("/api/v1/tags", {
    method: "POST",
    body: JSON.stringify({ names: [input.names] }),
  });

  return (await res.json()) as TagsResponse;
}

export const updateCategory = async (
  fetcher: Fetcher,
  input: { name: string; id: string }
) => {
  const res = await fetcher(`/api/v1/categories/${input.id}`, {
    method: "PUT",
    body: JSON.stringify({ name: input.name }),
  });

  return (await res.json()) as Category;
};

export const deleteCategory = async (
  fetcher: Fetcher,
  input: { id: string }
) => {
  await fetcher(`/api/v1/categories/${input.id}`, {
    method: "DELETE",
  });
};

export const deleteTag = async (fetcher: Fetcher, input: { id: string }) => {
  await fetcher(`/api/v1/tags/${input.id}`, {
    method: "DELETE",
  });
};
