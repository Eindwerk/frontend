import { notFound } from "next/navigation";
import type { ProfileVariant } from "@/types/ProfileVariant";
import { validVariants } from "@/types/ProfileVariant";
import ProfilePageClient from "@/components/profile-page/ProfilePageClient";

interface ProfilePageParams {
  params: {
    variant: string;
  };
}

export const dynamicParams = true;

const ProfilePage = async ({ params }: ProfilePageParams) => {
  const { variant } = await params; // ✅
  if (!validVariants.includes(variant as ProfileVariant)) {
    notFound();
  }

  return <ProfilePageClient variant={variant as ProfileVariant} />;
};

export default ProfilePage;

export async function generateStaticParams() {
  return validVariants.map((variant) => ({ variant }));
}
