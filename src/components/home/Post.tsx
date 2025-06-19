"use client";

import Image from "next/image";
import Text from "../ui/Text";
import { useState } from "react";
import PostButtons from "./PostButtons";
import type { Post } from "@/types/post";
import Link from "next/link";
import { slugify } from "@/lib/utils/slugify";
import { toggleLike } from "@/lib/actions/toggleLike";

const Post = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLikeToggle = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const result = await toggleLike(post.id, liked);

    if (result.success) {
      setLiked(!liked);
    } else {
      console.error(result.message);
    }

    setIsProcessing(false);
  };

  return (
    <div className="post">
      <div className="front__image">
        <Image
          priority
          src={post.image}
          alt="User Post"
          className="front__image__media"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="front__description">
        <div className="front__description__text">
          <div className="front__description__text__game">
            <Link
              href={`/profile/team/${post.game.home_team_id}/${slugify(
                post.game.home_team.name
              )}`}
            >
              <Text variant="bold-blue-17">{post.title}</Text>
            </Link>
          </div>
          <div className="front__description__text__stadium">
            <Link
              href={`/profile/stadium/${post.game?.stadium?.id}/${slugify(
                post.game?.stadium?.name
              )}`}
            >
              <Text variant="subtext-spaceblue-12">
                {post.game?.stadium?.name}
              </Text>
            </Link>
          </div>
        </div>

        <PostButtons
          liked={liked}
          onLikeToggle={handleLikeToggle} // ✅ voeg deze toe
          disabled={isProcessing} // ✅ optioneel, om spamclicks te voorkomen
        />
      </div>
    </div>
  );
};

export default Post;
