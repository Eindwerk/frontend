import { FriendRequest } from "@/components/notification-page/FriendRequest";
import NoNotifcations from "@/components/notification-page/NoNotifcations";
import UserNotificationCard from "@/components/notification-page/UserPostedSomething";

const NotificationPage = () => {
  return (
    <div className="notification-page">
      <FriendRequest />
      <UserNotificationCard
        type="new-post"
        username="Alice"
        userId="user_123"
      />

      <UserNotificationCard
        type="user-commented"
        username="Bob"
        userId="user_456"
        postId="post_789"
      />

      <UserNotificationCard
        type="user-liked"
        username="Charlie"
        userId="user_999"
        postId="post_888"
      />
    </div>
  );
};
export default NotificationPage;
