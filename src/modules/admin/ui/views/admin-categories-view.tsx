import { ViewCategoriesSection } from "../sections/view-categories-section";
import { CreateCategorySection } from "../sections/create-category-section";

export const AdminCategoriesView = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-[90%] w-7xl mx-auto mt-2 md:mt-16 lg:mt-24">
      <ViewCategoriesSection />

      <CreateCategorySection />
    </div>
  );
};
