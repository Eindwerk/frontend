"use client";

import { HeartIcon, MessageCircleMore } from "lucide-react";
import Link from "next/link";

interface PostButtonsProps {
  liked: boolean;
  setLiked: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const PostButtons = ({ liked, setLiked }: PostButtonsProps) => {
  return (
    <div className="front__description__icons">
      <Link href="/post-detail">
        <MessageCircleMore strokeWidth={1} />
      </Link>
      <HeartIcon
        strokeWidth={1}
        fill={liked ? "#0344dc" : "none"}
        onClick={() => setLiked((prev) => !prev)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default PostButtons;
