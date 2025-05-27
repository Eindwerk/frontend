import Image from "next/image";
import Text from "../ui/Text";

import DummyPost from "../../../public/dummy/GntAnd33.jpg";
import { HeartIcon, MessageCircleMore } from "lucide-react";

// TODO: Add animation for flipping the post

const Post = () => {
  return (
    <div className="post">
      <div className="front">
        <div className="front__image">
          <Image
            priority
            src={DummyPost}
            alt="User Post"
            className="front__image__media"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="front__description">
          <div className="front__description__text">
            <Text variant="bold-blue-17">KAA Gent - Anderlecht</Text>
            <Text variant="subtext-spaceblue-12">Planet Group Arena</Text>
          </div>
          <div className="front__description__icons">
            <MessageCircleMore strokeWidth={1} />
            <HeartIcon strokeWidth={1} />
          </div>
        </div>
      </div>
      <div className="back"></div>
    </div>
  );
};

export default Post;
