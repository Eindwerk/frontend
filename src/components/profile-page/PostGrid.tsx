import { Post } from "@/types/post";
import ProfilePost from "./ProfilePost";

interface Props {
  isEditing: boolean;
  posts?: Post[];
}

const PostGrid = ({ isEditing, posts }: Props) => {
  return (
    <div className="profile__scroll-area" role="region" aria-label="Post grid">
      <div className="profile__scroll-area__grid">
        {posts?.map((post) => (
          <ProfilePost key={post.id} isEditing={isEditing} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostGrid;
