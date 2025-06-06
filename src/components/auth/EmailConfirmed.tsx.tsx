// components/auth/EmailConfirmed.tsx
import Link from "next/link";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

interface EmailConfirmedProps {
  success: boolean;
  email: string;
  message?: string;
}

export default function EmailConfirmed({
  success,
  email,
  message,
}: EmailConfirmedProps) {
  return (
    <div className="email-confirmed-container max-w-md mx-auto p-6 text-center">
      {success ? (
        <>
          <Text variant="medium-white-20" className="mb-4">
            🎉 Je e-mailadres is succesvol bevestigd!
          </Text>
          <Text variant="subtext-white-12" className="mb-6">
            Je kunt nu inloggen met <strong>{decodeURIComponent(email)}</strong>
            .
          </Text>
          <Button>
            <Link href={`/sign-in?email=${encodeURIComponent(email)}`}>
              Ga naar inloggen
            </Link>
          </Button>
        </>
      ) : (
        <>
          <Text variant="medium-white-20" className="text-red-500 mb-4">
            Oeps, verificatie mislukt
          </Text>
          <Text variant="subtext-white-12" className="mb-6">
            {message ||
              "De link is mogelijk verlopen of ongeldig. Vraag een nieuwe verificatiemail aan."}
          </Text>
          <Button variant="orange">
            <Link href="/resend-verification">
              Nieuwe verificatie aanvragen
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}
