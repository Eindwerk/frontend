import Image from "next/image";

import DummyProfile from "@/../public/dummy/DSC_0569.jpg";
import Text from "../ui/Text";

const Comment = () => {
  return (
    <div className="comment">
      <div className="comment__profile-info">
        <div className="comment__profile-info__image-holder">
          <Image src={DummyProfile} alt="Dummy Profile" className="image" />
        </div>
        <div className="comment__profile-infor__name-holder">
          <Text variant="subtext-spaceblue-12">Cédric Van Hoorebeke</Text>
        </div>
      </div>
      <div className="comment__comment-box">
        <Text variant="regular-spaceblue-15">
          Wauw cool photo! I really want to go too!
        </Text>
      </div>
    </div>
  );
};
export default Comment;
