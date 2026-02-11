import { PostInfoSection } from "../sections/post-info-section";

export const PostInfoView = ({ postId }: { postId: string }) => {
  return <PostInfoSection postId={postId} />;
};
