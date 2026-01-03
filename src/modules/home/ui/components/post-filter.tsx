import { CategoriesResponse } from "@/modules/categories/domain/types";
import React from "react";
import { PostsQueryInput } from "../../api/home-queries";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  categories: CategoriesResponse;
  query: PostsQueryInput;
  setQuery: React.Dispatch<React.SetStateAction<PostsQueryInput>>;
}

export const PostFilter = ({ categories, query, setQuery }: Props) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={query.categoryId === undefined ? "primary" : "outline"}
          size="sm"
          className="cursor-pointer"
          onClick={() =>
            setQuery((prev) => ({
              ...prev,
              page: 0,
              categoryId: undefined,
            }))
          }
        >
          All
        </Button>

        {categories.map((c) => {
          const active =
            (c.id === "all" && !query.categoryId) || query.categoryId === c.id;

          return (
            <Button
              key={c.id}
              variant={active ? "primary" : "outline"}
              size="sm"
              className="cursor-pointer"
              onClick={() =>
                setQuery((prev) => ({
                  ...prev,
                  page: 0,
                  categoryId: c.id === "all" ? undefined : c.id,
                }))
              }
            >
              {c.name}
            </Button>
          );
        })}
      </div>

      <Select
        value={query.sortDir === "desc" ? "newest" : "oldest"}
        onValueChange={(v) =>
          setQuery((prev) => ({
            ...prev,
            page: 0,
            sortBy: "createdAt",
            sortDir: v === "newest" ? "desc" : "asc",
          }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
