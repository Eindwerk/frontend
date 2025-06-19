import Image from "next/image";

import { HeartIcon } from "lucide-react";
import Text from "../ui/Text";
import { Post } from "@/types/post";

const PostDetail = ({ post }: { post: Post }) => {
  return (
    <div className="post-detail">
      <div className="post-detail__image-holder">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="post-detail__image-holder__image"
        />
      </div>
      <div className="post-detail__description">
        <div className="post-detail__description__text">
          <div className="post-detail__description__text__title">
            <Text variant="bold-blue-17">{post.title}</Text>
          </div>
          <div className="post-detail__description__text__stadium">
            <Text variant="subtext-spaceblue-12">
              {post.game?.stadium?.name}
            </Text>
          </div>
        </div>
        <div className="post-detail__description__icons">
          <HeartIcon strokeWidth={1} />
        </div>
      </div>
    </div>
  );
};
export default PostDetail;
