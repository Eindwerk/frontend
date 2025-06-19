"use client";

import { HeartIcon } from "lucide-react";

interface PostButtonsProps {
  liked: boolean;
  onLikeToggle: () => void;
  disabled?: boolean;
}

const PostButtons = ({ liked, onLikeToggle, disabled }: PostButtonsProps) => {
  return (
    <div className="front__description__icons">
      <HeartIcon
        strokeWidth={1}
        fill={liked ? "#0344dc" : "none"}
        onClick={disabled ? undefined : onLikeToggle}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      />
    </div>
  );
};

export default PostButtons;
