import Image from "next/image";

import BannerDummy from "@/../public/dummy/IMG_2900.jpg";
import ProfileDummy from "@/../public/dummy/DSC_0569.jpg";
import { Link, LandmarkIcon } from "lucide-react";
import Text from "../ui/Text";
import { ProfilePageProps } from "@/types/ProfilePageProps";
import FollowButtonForm from "./FollowButtonForm";

const ProfileInfo = ({ variant }: ProfilePageProps) => {
  const renderIcon = () => {
    if (variant === "team") return <Link strokeWidth={1.5} />;
    if (variant === "stadium") return <LandmarkIcon strokeWidth={1.5} />;
    return null;
  };

  return (
    <>
      <div className="profile-page__banner">
        <Image src={BannerDummy} alt="Banner Photo" />
      </div>
      <div className="profile-page__photo">
        <Image src={ProfileDummy} alt="Profile Photo" />
      </div>
      <div className="profile-page__info">
        <div className="profile-page__info__name">
          <Text variant="bold-blue-17">Cédric Van Hoorebeke</Text>
        </div>
        <div className="profile-page__info__buttons">
          {renderIcon()}
          <div className="profile-page__info__buttons__follow">
            <FollowButtonForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
