import { Item } from "./Item";

interface Props {
  items: {
    id: string;
    name: string;
    postCount: number;
  }[];
  type?: "Tag" | "Category";
}

export const CategoryTagList = ({ items, type }: Props) => {
  return (
    <div className="p-4">
      <h1 className="font-extralight">Existing Items</h1>

      <ul className="mt-4">
        {items.map((item) => (
          <Item key={item.id} item={item} type={type} />
        ))}
      </ul>
    </div>
  );
};
