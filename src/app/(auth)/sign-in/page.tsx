import Image from "next/image";
import Text from "@/components/ui/Text";

import Logo from "@/assets/logo.png";
import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Link from "next/link";

// TODO: add error when email or password is incorrect

const page = () => {
  return (
    <div className="signin-page">
      <div className="signin-page__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>
      <div className="signin-page__text">
        <div className="form">
          <div className="form__title">
            <Text variant="medium-white-20">Sign in to your account</Text>
          </div>
          <Input label="Email" type="email" />
          <Input label="Password" type="password" />
          <div className="form__forgot">
            <Link href={"/forgot-password"}>
              <Text variant="subtext-white-12">Forgot password?</Text>
            </Link>
          </div>
        </div>
      </div>
      <div className="signin-page__buttons">
        <Button variant="primary">Sign in</Button>
        <Button variant="orange">Create an account</Button>
      </div>
    </div>
  );
};
export default page;
