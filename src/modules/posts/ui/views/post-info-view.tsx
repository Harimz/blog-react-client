import { PostInfoSection } from "../sections/post-info-section";

export const PostInfoView = ({ postId }: { postId: string }) => {
  return (
    <div className="max-w-7xl w-[90%] mx-auto mt-10 min-h-screen">
      <PostInfoSection postId={postId} />
    </div>
  );
};
