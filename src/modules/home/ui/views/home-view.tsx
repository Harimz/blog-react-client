import { HeaderSection } from "../sections/header-section";
import { PostsSection } from "../sections/posts-section";

export const HomeView = () => {
  return (
    <div className="min-h-screen">
      <HeaderSection />

      <div className="max-w-400 w-[95%] mx-auto">
        <PostsSection />
      </div>
    </div>
  );
};
