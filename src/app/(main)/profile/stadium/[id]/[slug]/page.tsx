import { notFound } from "next/navigation";
import ProfilePageClient from "@/components/profile-page/ProfilePageClient";
import { getStadiumById } from "@/lib/actions/getStadiumById";
import type { ProfileData } from "@/types/profileData";
import { slugify } from "@/lib/utils/slugify";

export const dynamicParams = true;

export default async function StadiumProfilePage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = await params;

  const stadium = await getStadiumById(Number(id));
  if (!stadium) return notFound();

  const expectedSlug = slugify(stadium.name);

  if (slug !== expectedSlug) return notFound();

  const profile: ProfileData = {
    name: stadium.name,
    username: stadium.name ?? "",
    profile_image: stadium.profile_image ?? "",
    banner_image: stadium.banner_image ?? "",
  };

  console.log("Stadium profile data:", profile);

  return <ProfilePageClient variant="stadium" user={profile} />;
}
