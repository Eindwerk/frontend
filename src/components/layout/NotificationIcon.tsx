"use client";

import { usePathname } from "next/navigation";
import { BellIcon } from "lucide-react";
import clsx from "clsx";

const NotificationIcon = () => {
  const pathname = usePathname();
  const isActive = pathname === "/notifications";

  return (
    <div
      className={clsx("header__notification", {
        "header__notification--active": isActive,
      })}
    >
      <BellIcon strokeWidth={1} />
    </div>
  );
};

export default NotificationIcon;
