import { notFound } from "next/navigation";
import ProfilePageClient from "@/components/profile-page/ProfilePageClient";
import { getTeamById } from "@/lib/actions/getTeamById";
import { getPostsByTeam } from "@/lib/actions/getTeamPosts";
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

  const posts = await getPostsByTeam(id);

  const expectedSlug = slugify(team.name);

  if (slug !== expectedSlug) return notFound();

  const profile: ProfileData = {
    name: team.name,
    username: team.name ?? "",
    profile_image: team.profile_image ?? "",
    banner_image: team.banner_image ?? "",
  };

  console.log(profile);

  return <ProfilePageClient variant="team" user={profile} posts={posts} />;
}
