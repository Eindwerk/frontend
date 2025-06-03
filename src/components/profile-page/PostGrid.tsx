import ProfilePost from "./ProfilePost";

interface Props {
  isEditing: boolean;
}

const PostGrid = ({ isEditing }: Props) => {
  return (
    <div className="profile__scroll-area">
      <div className="profile__scroll-area__grid">
        {Array.from({ length: 24 }).map((_, i) => (
          <ProfilePost key={i} isEditing={isEditing} />
        ))}
      </div>
    </div>
  );
};

export default PostGrid;
