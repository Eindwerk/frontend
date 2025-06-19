"use client";

import UserNotificationCard from "@/components/notification-page/UserPostedSomething";
import NoNotifications from "@/components/notification-page/NoNotifcations";
import { useNotification } from "@/context/NotificationContext";

const NotificationPage = () => {
  const { count, notifications } = useNotification();
  console.log("Notifications:", notifications);

  return (
    <div className="notification-page">
      {count === 0 ? (
        <NoNotifications />
      ) : (
        <>
          {notifications.map((n, idx) => {
            return (
              <UserNotificationCard
                key={n.id ?? idx}
                id={n.id}
                sender_id={n.sender_id}
                created_at={n.created_at}
                updated_at={n.updated_at}
                type={n.type}
                username={n.username}
                user_id={n.user_id}
                post_id={n.post_id}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default NotificationPage;
