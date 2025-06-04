import Image from "next/image";
import Text from "@/components/ui/Text";
import Logo from "@/assets/logo.png";
import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Link from "next/link";

const page = () => {
  return (
    <div className="forgot-pass-page">
      <div className="forgot-pass-page__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>

      <div className="forgot-pass-page__text">
        <div className="form">
          <div className="form__title">
            <Text variant="medium-white-20">Fill in you email</Text>
          </div>

          <Input label="Email" type="email" />
        </div>
      </div>

      <div className="forgot-pass-page__buttons">
        <Button variant="primary">
          <Link href="/email-sent">Send email</Link>
        </Button>
        <Button variant="orange">
          <Link href="/sign-in">Back</Link>
        </Button>
      </div>
    </div>
  );
};
export default page;
