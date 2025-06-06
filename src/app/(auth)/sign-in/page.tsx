import SignInForm from "@/components/auth/SignInForm";

interface SignInPageProps {
  searchParams: {
    verify_token?: string;
    email?: string;
  };
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  // Haal verify_token en email uit de query, of geef empty string als ze er niet zijn
  const verifyToken = searchParams.verify_token ?? "";
  const pendingEmail = searchParams.email ?? "";

  return (
    <div className="sign-in-page">
      {/* Geef de gevonden waarden als props door aan de form */}
      <SignInForm pendingToken={verifyToken} pendingEmail={pendingEmail} />
    </div>
  );
}
