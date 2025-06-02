"use client";

// TODO: get the amount of notifications from the api

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface Notification {
  type: "friend-request" | "new-post" | "user-commented" | "user-liked";
  username?: string;
  userId?: string;
  postId?: string;
}

interface NotificationContextType {
  count: number;
  notifications: Notification[];
  setCount: (count: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};

const defaultNotifications: Notification[] = [
  { type: "friend-request" },
  { type: "new-post", username: "Alice", userId: "user_123" },
  {
    type: "user-commented",
    username: "Bob",
    userId: "user_456",
    postId: "post_789",
  },
  {
    type: "user-liked",
    username: "Charlie",
    userId: "user_101",
    postId: "post_112",
  },
];

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications] = useState<Notification[]>(defaultNotifications);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(notifications.length);
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{ count, setCount, notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
