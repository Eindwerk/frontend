import Image from "next/image";
import Logo from "@/assets/logo.png";
import Form from "next/form";
import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import Link from "next/link";
import { signIn } from "@/lib/actions/signIn";

const SignInPage = () => {
  return (
    <div className="sign-in-page">
      <div className="sign-in-page__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>

      <Form action={signIn} className="form">
        <div className="form__header">
          <Text variant="medium-white-20">Sign in to your account</Text>
          <Input label="Email" type="email" name="email" required />
          <Input label="Password" type="password" name="password" required />
          <div className="form__forgot">
            <Link href="/forgot-password">
              <Text variant="subtext-white-12">Forgot password?</Text>
            </Link>
          </div>
        </div>
        <div className="form__footer">
          <Button variant="primary" type="submit">
            Sign in
          </Button>
          <Button variant="orange">
            <Link href="/create-an-account">Create an account</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignInPage;
