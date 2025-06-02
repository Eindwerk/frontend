"use client";

import { usePathname } from "next/navigation";
import { BellIcon } from "lucide-react";
import clsx from "clsx";
import Text from "../ui/Text";

interface NotificationIconProps {
  count?: number;
}

const NotificationIcon = ({ count = 0 }: NotificationIconProps) => {
  const pathname = usePathname();
  const isActive = pathname === "/notifications";

  const showCount = count > 0;
  const displayCount = count > 9 ? "9+" : count.toString();

  return (
    <div
      className={clsx("header__notification", {
        "header__notification--active": isActive,
      })}
    >
      <BellIcon strokeWidth={1} />
      {showCount && (
        <span className="header__notification-count">
          <Text variant="subtext-white-12">{displayCount}</Text>
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
