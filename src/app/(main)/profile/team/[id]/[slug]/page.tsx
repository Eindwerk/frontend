import { notFound } from "next/navigation";
import ProfilePageClient from "@/components/profile-page/ProfilePageClient";
import { getTeamById } from "@/lib/actions/getTeamById";
import type { ProfileData } from "@/types/profileData";
import { slugify } from "@/lib/utils/slugify";

export const dynamicParams = true;

export default async function TeamProfilePage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = await params;

  const team = await getTeamById(Number(id));
  if (!team) return notFound();

  const expectedSlug = slugify(team.name);

  if (slug !== expectedSlug) return notFound();

  const profile: ProfileData = {
    name: team.name,
    username: team.name ?? "",
    profile_image: team.logo_url ?? "",
    banner_image: team.banner_image ?? "",
  };

  return <ProfilePageClient variant="team" user={profile} />;
}
