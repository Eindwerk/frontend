import ProfilePageClient from "@/components/profile-page/ProfilePageClient";
import { getUserMe } from "@/lib/actions/getUserMe";
import { getUserPosts } from "@/lib/actions/getUserPosts";
import type { ProfileData } from "@/types/profileData";

export const metadata = {
  title: "My Profile",
  description: "View and manage your profile and posts",
};

export default async function MyProfilePage() {
  const me = await getUserMe();
  const posts = await getUserPosts();
  const userProfile: ProfileData = {
    id: me.id,
    name: me.name,
    username: me.username ?? "",
    profile_image: me.profile_image ?? "",
    banner_image: me.banner_image ?? "",
  };

  return (
    <ProfilePageClient variant="my-profile" user={userProfile} posts={posts} />
  );
}
