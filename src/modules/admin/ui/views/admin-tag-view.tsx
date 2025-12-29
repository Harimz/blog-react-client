import { ViewTagsSection } from "../sections/view-tags-section";
import { CreateTagSection } from "../sections/create-tag-section";

export const AdminTagView = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-[90%] w-7xl mx-auto mt-2 md:mt-16 lg:mt-24">
      <ViewTagsSection />

      <CreateTagSection />
    </div>
  );
};
