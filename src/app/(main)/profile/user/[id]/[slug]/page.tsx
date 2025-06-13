import { notFound } from "next/navigation";
import ProfilePageClient from "@/components/profile-page/ProfilePageClient";
import { getUserById } from "@/lib/actions/getUserById";
import type { ProfileData } from "@/types/profileData";
import { slugify } from "@/lib/utils/slugify";

export const dynamicParams = true;

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = await params;

  const user = await getUserById(Number(id));
  if (!user) return notFound();

  const expectedSlug = slugify(user.name);

  if (slug !== expectedSlug) return notFound();

  const profile: ProfileData = {
    name: user.name,
    username: user.name ?? "",
    profile_image: user.profile_image ?? "",
    banner_image: user.banner_image ?? "",
  };

  return <ProfilePageClient variant="user" user={profile} />;
}
