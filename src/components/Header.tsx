import Image from "next/image";
import Text from "./ui/Text";
import Notification from "../../public/icons/notification.svg";
import Link from "next/link";

const Header = () => {
  return (
    <div className="header">
      <Link href="/">
        <div className="header__title">
          <Text variant="bold-white-20">GROUNDPASS</Text>
        </div>
      </Link>
      <Link href="/notifications">
        <div className="header__notification">
          <Image priority src={Notification} alt="Notification Icon" />
        </div>
      </Link>
    </div>
  );
};
export default Header;
