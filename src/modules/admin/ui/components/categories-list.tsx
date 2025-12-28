import { CategoriesResponse } from "@/modules/categories/domain/types";
import { Ellipsis } from "lucide-react";
import React from "react";

interface Props {
  categories: CategoriesResponse;
}

export const CategoriesList = ({ categories }: Props) => {
  return (
    <div className="p-4">
      <h1 className="font-extralight">Existing Categories</h1>

      <ul className="mt-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex justify-between py-4 border-b-2"
          >
            <h1 className="font-semibold">{category.name}</h1>

            <Ellipsis />
          </li>
        ))}
      </ul>
    </div>
  );
};
