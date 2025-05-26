import Link from "next/link";
import Image from "next/image";

import Home from "../../public/icons/home.svg";
import Search from "../../public/icons/search.svg";
import NewPost from "../../public/icons/add.svg";
import Map from "../../public/icons/map.svg";
import MyProfile from "../../public/icons/profile.svg";

const Footer = () => {
  return (
    <div className="footer">
      <Link href="/">
        <div className="footer__menu">
          <Image priority src={Home} alt="Home Icon" />
        </div>
      </Link>
      <Link href="/search">
        <div className="footer__menu">
          <Image priority src={Search} alt="Search Icon" />
        </div>
      </Link>
      <Link href="/new-post">
        <div className="footer__menu">
          <Image priority src={NewPost} alt="New Post Icon" />
        </div>
      </Link>
      <Link href="/map">
        <div className="footer__menu">
          <Image priority src={Map} alt="Map Icon" />
        </div>
      </Link>
      <Link href="/my-profile">
        <div className="footer__menu">
          <Image priority src={MyProfile} alt="My Profile Icon" />
        </div>
      </Link>
    </div>
  );
};
export default Footer;
