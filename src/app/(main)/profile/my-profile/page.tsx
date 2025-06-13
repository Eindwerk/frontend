import { notFound } from "next/navigation";
import ProfilePageClient from "@/components/profile-page/ProfilePageClient";
import { getUserMe } from "@/lib/actions/getUserMe";
import type { ProfileData } from "@/types/profileData";

export default async function MyProfilePage() {
  const me = await getUserMe();

  if (!me) return notFound();

  const profile: ProfileData = {
    name: me.name,
    username: me.username ?? "",
    profile_image: me.profile_image ?? "",
    banner_image: me.banner_image ?? "",
  };

  return <ProfilePageClient variant="my-profile" user={profile} />;
}
