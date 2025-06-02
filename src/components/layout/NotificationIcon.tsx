"use client";

import { usePathname } from "next/navigation";
import { BellIcon } from "lucide-react";
import clsx from "clsx";
import Text from "../ui/Text";

interface NotificationIconProps {
  count?: number;
}

const NotificationIcon = ({ count }: NotificationIconProps) => {
  const pathname = usePathname();
  const isActive = pathname === "/notifications";

  return (
    <div
      className={clsx("header__notification", {
        "header__notification--active": isActive,
      })}
    >
      <BellIcon strokeWidth={1} />
      {count && count > 0 && (
        <span className="header__notification-count">
          <Text variant="subtext-white-12">{count}</Text>
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
