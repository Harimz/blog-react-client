import { MoreInfo } from "../components/more-info";
import { HeaderSection } from "../sections/header-section";
import { PostsSection } from "../sections/posts-section";

export const HomeView = () => {
  return (
    <div className="max-w-560 w-[90%] mx-auto mt-10">
      <HeaderSection />

      <PostsSection />

      <MoreInfo />
    </div>
  );
};
