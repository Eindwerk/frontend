"use client";

import Image from "next/image";
import Text from "../ui/Text";
import DummyPost from "../../../public/dummy/GntAnd33.jpg";
import { useState } from "react";
import PostButtons from "./PostButtons";

const Post = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="post">
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
        <PostButtons liked={liked} setLiked={setLiked} />
      </div>
    </div>
  );
};

export default Post;
