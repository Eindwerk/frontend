import Image from "next/image";
import Text from "@/components/ui/Text";
import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import Form from "next/form";
import { resetPassword } from "@/lib/actions/resetPassword";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const { token, email } = await searchParams;

  return (
    <div className="reset-password-page">
      <div className="reset-password-page__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>

      <Form action={resetPassword} className="form">
        <div className="form__header">
          <Text variant="medium-white-20">Choose a new password</Text>

          <input type="hidden" name="token" value={token ?? ""} />
          <input type="hidden" name="email" value={email ?? ""} />

          <Input
            label="New password"
            type="password"
            name="password"
            required
          />
          <Input
            label="Confirm password"
            type="password"
            name="password_confirmation"
            required
          />
        </div>

        <div className="form__footer">
          <Button variant="primary" type="submit">
            Reset password
          </Button>
          <Button variant="orange">
            <Link href="/sign-in">Back</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
}
