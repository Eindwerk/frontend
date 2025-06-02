"use client";

import { FriendRequest } from "@/components/notification-page/FriendRequest";
import UserNotificationCard from "@/components/notification-page/UserPostedSomething";
import NoNotifications from "@/components/notification-page/NoNotifcations";
import { useNotification } from "@/context/NotificationContext";

const NotificationPage = () => {
  const { count, notifications } = useNotification();

  return (
    <div className="notification-page">
      {count === 0 ? (
        <NoNotifications />
      ) : (
        <>
          {notifications.map((n, idx) => {
            if (n.type === "friend-request") {
              return <FriendRequest key={idx} />;
            }

            return (
              <UserNotificationCard
                key={idx}
                type={n.type}
                username={n.username ?? ""}
                userId={n.userId ?? ""}
                postId={n.postId ?? ""}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default NotificationPage;
