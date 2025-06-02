"use client";

// TODO: Link to the post or user profile when clicked

import {
  ArrowRightIcon,
  Bell,
  HeartIcon,
  MessageCircleMore,
} from "lucide-react";
import Text from "../ui/Text";
import { useRouter } from "next/navigation";

interface UserNotificationCardProps {
  type: "new-post" | "user-commented" | "user-liked";
  username: string;
  userId: string;
  postId?: string;
}

const UserNotificationCard: React.FC<UserNotificationCardProps> = ({
  type,
  username,
  userId,
  postId,
}) => {
  const router = useRouter();

  const getIcon = () => {
    switch (type) {
      case "user-commented":
        return <MessageCircleMore />;
      case "user-liked":
        return <HeartIcon />;
      default:
        return <Bell />;
    }
  };

  const getText = () => {
    switch (type) {
      case "user-commented":
        return `${username}, commented on your post`;
      case "user-liked":
        return `${username}, liked your post`;
      default:
        return `${username}, posted something`;
    }
  };

  const handleClick = () => {
    switch (type) {
      case "new-post":
      case "user-commented":
      case "user-liked":
        if (postId) {
          router.push(`/posts/${postId}`);
        } else {
          router.push(`/profile/${userId}`);
        }
        break;
    }
  };

  return (
    <div className="user-posted-card">
      <button className="user-posted-card__summary" onClick={handleClick}>
        <div className="user-posted-card__info">
          <span className="user-posted-card__icon">{getIcon()}</span>
          <Text variant="bold-blue-17">{getText()}</Text>
        </div>
        <span className="user-posted-card__arrow">
          <ArrowRightIcon />
        </span>
      </button>
    </div>
  );
};

export default UserNotificationCard;
