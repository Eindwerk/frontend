import SignInForm from "@/components/auth/SignInForm";

interface SignInPageProps {
  searchParams: Promise<{
    verify_token?: string;
    email?: string;
  }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const verifyToken = params.verify_token ?? "";
  const pendingEmail = params.email ?? "";

  return (
    <div className="sign-in-page">
      <SignInForm pendingToken={verifyToken} pendingEmail={pendingEmail} />
    </div>
  );
}
