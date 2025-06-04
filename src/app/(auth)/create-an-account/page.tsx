import Image from "next/image";
import Text from "@/components/ui/Text";
import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Logo from "@/assets/logo.png";
import Link from "next/link";

const CreateAccountPage = () => {
  return (
    <div className="create-account-page">
      <div className="create-account-page__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>

      <div className="create-account-page__text">
        <div className="form">
          <div className="form__title">
            <Text variant="medium-white-20">Create your account</Text>
          </div>

          <Input label="Name" type="text" />
          <Input label="Username" type="text" />
          <Input label="Email" type="email" />
          <Input label="Password" type="password" />
        </div>
      </div>

      <div className="create-account-page__buttons">
        <Button variant="primary">
          <Link href="/confirm-email">Sign up</Link>
        </Button>
        <Button variant="orange">
          <Link href="/sign-in">Already have an account?</Link>
        </Button>
      </div>
    </div>
  );
};

export default CreateAccountPage;
