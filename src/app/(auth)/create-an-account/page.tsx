"use client";

import Image from "next/image";
import Text from "@/components/ui/Text";
import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Logo from "@/assets/logo.png";

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
        <Button
          variant="primary"
          onClick={() => {
            window.location.href = "/create-an-account";
          }}
        >
          Sign up
        </Button>
        <Button
          variant="orange"
          onClick={() => {
            window.location.href = "/sign-in";
          }}
        >
          Already have an account?
        </Button>
      </div>
    </div>
  );
};

export default CreateAccountPage;
