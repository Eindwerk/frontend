"use client";

import { ArrowRightIcon, Bell, HeartIcon } from "lucide-react";
import Text from "../ui/Text";
import Link from "next/link";
import { Notification } from "@/types/notification";
import { deleteNotification } from "@/lib/actions/deleteNotification";

const UserNotificationCard: React.FC<Notification> = ({
  type,
  username,
  post_id,
}) => {
  const getIcon = () => {
    switch (type) {
      case "friend_post":
        return <Bell />;
      case "like":
        return <HeartIcon />;
      default:
        return <Bell />;
    }
  };

  const getText = () => {
    switch (type) {
      case "friend_post":
        return `${username}, posted something`;
      case "like":
        return `${username}, liked your post`;
      default:
        return `${username}, posted something`;
    }
  };

  return (
    <Link
      href={`/post-detail/${post_id}`}
      onClick={() => {
        if (typeof post_id === "number") {
          deleteNotification(post_id);
        }
      }}
    >
      <div className="user-posted-card">
        <button className="user-posted-card__summary">
          <div className="user-posted-card__info">
            <span className="user-posted-card__icon">{getIcon()}</span>
            <Text variant="bold-blue-17">{getText()}</Text>
          </div>
          <span className="user-posted-card__arrow">
            <ArrowRightIcon />
          </span>
        </button>
      </div>
    </Link>
  );
};

export default UserNotificationCard;
