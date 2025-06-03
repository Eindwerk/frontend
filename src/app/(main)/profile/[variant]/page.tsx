import ProfileInfo from "@/components/profile-page/ProfileInfo";
import PostGrid from "@/components/profile-page/PostGrid";

import { ProfilePageProps } from "@/types/ProfilePageProps";

const ProfilePage = async (props: {
  params: { variant: ProfilePageProps["variant"] };
}) => {
  const { params } = props;
  const { variant } = await params;
  return (
    <div className="profile-page">
      <ProfileInfo variant={variant} />
      <PostGrid />
    </div>
  );
};

export default ProfilePage;
