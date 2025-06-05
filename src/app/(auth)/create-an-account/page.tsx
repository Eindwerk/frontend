import Image from "next/image";
import Logo from "@/assets/logo.png";
import Form from "next/form";
import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import Link from "next/link";
import { createAccount } from "@/lib/actions/createAccount";

const CreateAccountPage = () => {
  return (
    <div className="create-account-page">
      <div className="create-account-page__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>

      <Form action={createAccount} className="form">
        <div className="form__header">
          <Text variant="medium-white-20">Create your account</Text>
          <Input label="Name" type="text" name="name" required />
          <Input label="Username" type="text" name="username" required />
          <Input label="Email" type="email" name="email" required />
          <Input label="Password" type="password" name="password" required />
        </div>
        <div className="form__footer">
          <Button variant="primary" type="submit">
            Sign up
          </Button>
          <Button variant="orange">
            <Link href="/sign-in">Already have an account?</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateAccountPage;
