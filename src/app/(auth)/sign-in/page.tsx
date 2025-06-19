import SignInForm from "@/components/auth/SignInForm";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account to access your dashboard",
};

export default function SignInPage() {
  return (
    <div className="sign-in-page">
      <SignInForm />
    </div>
  );
}
