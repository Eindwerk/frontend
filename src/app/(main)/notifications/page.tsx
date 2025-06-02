"use client";

// TODO: get the count from the server

import { useEffect } from "react";
import { FriendRequest } from "@/components/notification-page/FriendRequest";
import UserNotificationCard from "@/components/notification-page/UserPostedSomething";
import { useNotification } from "@/context/NotificationContext";

const NotificationPage = () => {
  const { setCount } = useNotification();

  const renderedNotifications = [
    <FriendRequest key="friend-request" />,
    <UserNotificationCard
      key="post"
      type="new-post"
      username="Alice"
      userId="user_123"
    />,
    <UserNotificationCard
      key="comment"
      type="user-commented"
      username="Bob"
      userId="user_456"
      postId="post_789"
    />,
    <UserNotificationCard
      key="like"
      type="user-liked"
      username="Charlie"
      userId="user_101"
      postId="post_112"
    />,
  ];

  useEffect(() => {
    setCount(renderedNotifications.length);
  }, [setCount, renderedNotifications.length]);

  return (
    <div className="notification-page">
      {renderedNotifications.map((notification) => notification)}
    </div>
  );
};

export default NotificationPage;
