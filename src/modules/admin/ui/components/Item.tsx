import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Ellipsis, Trash } from "lucide-react";
import {
  useDeleteCategory,
  useDeleteTag,
  useUpdateCategory,
} from "../../api/admin-mutations";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  item: {
    id: string;
    name: string;
    postCount: number;
  };
  type?: "Tag" | "Category";
}

export const Item = ({ item, type }: Props) => {
  const [editedCategory, setEditedCategory] = useState(item.name);
  const [editMode, setEditMode] = useState(false);

  const { mutate: deleteCategory } = useDeleteCategory();

  const { mutate: updateCategory } = useUpdateCategory();

  const { mutate: deleteTag } = useDeleteTag();

  const handleUpdate = () => {
    if (type === "Category")
      updateCategory({ name: editedCategory, id: item.id });
  };

  const handleDelete = () => {
    if (type === "Category") deleteCategory({ id: item.id });

    if (type === "Tag") deleteTag({ id: item.id });
  };

  return (
    <li key={item.id} className="flex justify-between py-4 border-b-2">
      {!editMode && <h1 className="font-semibold">{item.name}</h1>}

      {editMode && (
        <Input
          value={editedCategory}
          onChange={({ target }) => setEditedCategory(target.value)}
          className="w-60 shadow-none"
        />
      )}

      {editMode && (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </div>
      )}

      {!editMode && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full cursor-pointer"
            >
              <Ellipsis />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-26 flex flex-col gap-2">
            {type === "Category" && (
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-muted-foreground"
                onClick={() => setEditMode(true)}
              >
                <Edit className="size-4" />

                <h1 className="mt-1">Edit</h1>
              </div>
            )}

            <div
              className="flex items-center gap-2 cursor-pointer hover:text-muted-foreground"
              onClick={handleDelete}
            >
              <Trash className="size-4" />

              <h1 className="mt-1">Delete</h1>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </li>
  );
};
