"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Notification } from "@/types/notification";

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
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        const data: Notification[] = await res.json();
        setNotifications(data);
        setCount(data.length);
      } catch (error) {
        console.error("Kon notificaties niet ophalen:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ count, setCount, notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
