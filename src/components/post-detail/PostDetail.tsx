import Image from "next/image";

import DummyPost from "../../../public/dummy/GntAnd33.jpg";
import { HeartIcon, MessageCircleMore } from "lucide-react";
import Text from "../ui/Text";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const PostDetail = () => {
  return (
    <div className="post-detail">
      <div className="post-detail__image-holder">
        <Image
          src={DummyPost}
          alt="Dummt Post"
          className="post-detail__image-holder__image"
        />
      </div>
      <div className="post-detail__description">
        <div className="post-detail__description__text">
          <Text variant="bold-blue-17">KAA Gent - Anderlecht</Text>
          <Text variant="subtext-spaceblue-12">Planet Group Arena</Text>
        </div>
        <div className="post-detail__description__icons">
          <MessageCircleMore strokeWidth={1} />
          <HeartIcon strokeWidth={1} />
        </div>
      </div>
      <div className="post-detail__comments">
        <CommentList />
      </div>
      <div className="post-detail__comment-form">
        <CommentForm />
      </div>
    </div>
  );
};
export default PostDetail;
