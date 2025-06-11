import { notFound } from "next/navigation";
import type { ProfileVariant } from "@/types/ProfileVariant";
import { validVariants } from "@/types/ProfileVariant";
import ProfilePageClient from "@/components/profile-page/ProfilePageClient";
import { getUserMe } from "@/lib/actions/getUserMe";

export const dynamicParams = true;

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ variant: string }>;
}) => {
  const { variant } = await params;

  // Ongeldig profieltype? 404
  if (!validVariants.includes(variant as ProfileVariant)) {
    notFound();
  }

  // Als het om je eigen profiel gaat: haal gebruiker op via beveiligde API
  const user = variant === "my-profile" ? await getUserMe() : null;

  return <ProfilePageClient variant={variant as ProfileVariant} user={user} />;
};

export default ProfilePage;

export async function generateStaticParams() {
  return validVariants.map((variant) => ({ variant }));
}
