import Link from "next/link";
import Text from "../ui/Text";
import NotificationIcon from "./NotificationIcon";

const Header = () => {
  return (
    <div className="header">
      <Link href="/">
        <div className="header__title">
          <Text variant="bold-white-20">GROUNDPASS</Text>
        </div>
      </Link>
      <Link href="/notifications">
        <NotificationIcon />
      </Link>
    </div>
  );
};

export default Header;
