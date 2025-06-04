import Image from "next/image";
import Logo from "@/assets/logo.png";
import Text from "@/components/ui/Text";
import { CircleCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

// TODO BEKIJK LOTTIE VOOR ANIMATIE ICON

const page = () => {
  return (
    <div className="confirm-email-page">
      <div className="confirm-email-page__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>

      <div className="confirm-email-page__text">
        <Text variant="medium-white-20">Email sent </Text>
        <Text variant="subtext-white-12">
          Please check your mailbox to confirm your account
        </Text>
        <div className="icon">
          <CircleCheck strokeWidth={1} />
        </div>
      </div>

      <div className="confirm-email-page__buttons">
        <Button variant="orange">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    </div>
  );
};
export default page;
