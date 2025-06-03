"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, Search, PlusIcon, MapIcon, User } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const menuItems = [
  { href: "/", icon: HomeIcon },
  { href: "/search", icon: Search },
  { href: "/new-post", icon: PlusIcon, plus: true },
  { href: "/map", icon: MapIcon },
  { href: "/profile/my-profile", icon: User },
];

const ClientFooter = () => {
  const pathname = usePathname();
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeIndex = menuItems.findIndex((item) => item.href === pathname);
    const activeRef = menuRefs.current[activeIndex];
    if (activeRef) {
      const { offsetLeft, offsetWidth } = activeRef;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [pathname]);

  return (
    <div className="footer">
      <div
        className="footer__indicator"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />
      {menuItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <div
              ref={(el) => {
                menuRefs.current[idx] = el;
              }}
              className={`footer__menu${
                pathname === item.href ? " footer__menu--active" : ""
              }${item.plus ? " footer__menu--plus" : ""}`}
            >
              <Icon strokeWidth={1} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ClientFooter;
