import { Category } from "@/modules/categories/domain/types";

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
