import Image from "next/image";

import DummyPicture from "@/../public/dummy/IMG_2900.jpg";
import Text from "../ui/Text";

const ProfilePost = () => {
  return (
    <div className="profile-page__post-grid__post">
      <div className="profile-page__post-grid__post__image">
        <Image src={DummyPicture} alt="Profile Post" />
      </div>
      <div className="profile-page__post-grid__post__content subtext-white-12">
        <Text variant="subtext-white-12">KAA Gent - Anderlecht</Text>
      </div>
    </div>
  );
};
export default ProfilePost;
