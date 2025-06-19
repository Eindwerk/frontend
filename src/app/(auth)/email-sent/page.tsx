import Image from "next/image";
import Logo from "@/assets/logo.png";
import Text from "@/components/ui/Text";
import { CircleCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata = {
  title: "Email Sent",
  description: "Check your mailbox to reset your password",
};

const page = () => {
  return (
    <div className="email-sent-page">
      <div className="email-sent-page__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>

      <div className="email-sent-page__text">
        <Text variant="medium-white-20">Email sent </Text>
        <Text variant="subtext-white-12">
          Please check your mailbox to reset your password
        </Text>
        <div className="icon">
          <CircleCheck strokeWidth={1} />
        </div>
      </div>

      <div className="email-sent-page__buttons">
        <Button variant="primary">
          {/* TODO: kijk om hier een rechtsreekse link neer te zetten */}
          <Link href="/forgot-password">Send again</Link>
        </Button>
        <Button variant="orange">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    </div>
  );
};
export default page;
