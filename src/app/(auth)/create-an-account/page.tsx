import CreateAccountForm from "@/components/auth/CreateAccountForm";

export const metadata = {
  title: "Create Account",
  description: "Create a new account to join our community",
};

export default function CreateAccountPage() {
  return (
    <div className="create-account-page">
      <CreateAccountForm />
    </div>
  );
}
