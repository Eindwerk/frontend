import Link from "next/link";
import Text from "../ui/Text";
import NotificationIcon from "./NotificationIcon";
import { useNotification } from "@/context/NotificationContext";

const Header = () => {
  const { count } = useNotification();
  return (
    <div className="header">
      <div className="header__content">
        <Link href="/">
          <div className="header__title">
            <Text variant="bold-white-20">GROUNDPASS</Text>
          </div>
        </Link>
        <Link href="/notifications">
          <NotificationIcon count={count} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
