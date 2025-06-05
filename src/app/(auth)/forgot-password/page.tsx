import Image from "next/image";
import Text from "@/components/ui/Text";
import Logo from "@/assets/logo.png";
import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Form from "next/form";
import Link from "next/link";
import { forgotPassword } from "@/lib/actions/forgotPassword";

export default function ForgotPasswordPage() {
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-page__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>

      <Form action={forgotPassword} className="form">
        <div className="form__header">
          <Text variant="medium-white-20">Fill in your email</Text>
          <Input label="Email" type="email" name="email" required />
        </div>

        <div className="form__footer">
          <Button variant="primary" type="submit">
            Send email
          </Button>
          <Button variant="orange">
            <Link href="/sign-in">Back</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
}
