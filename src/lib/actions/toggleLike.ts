"use server";

import { likePost } from "./likePost";
import { unlikePost } from "./unlike";
import { getUserMe } from "./getUserMe";

export async function toggleLike(
  postId: number,
  alreadyLiked: boolean
): Promise<{
  success: boolean;
  message?: string;
}> {
  const userId = await getUserMe();
  if (!userId) return { success: false, message: "Gebruiker niet ingelogd." };

  if (alreadyLiked) {
    const result = await unlikePost(postId);
    return result?.success
      ? { success: true, message: "Like verwijderd." }
      : { success: false, message: "Verwijderen van like mislukt." };
  } else {
    const result = await likePost(postId);
    return result?.success
      ? { success: true, message: "Like toegevoegd." }
      : { success: false, message: "Toevoegen van like mislukt." };
  }
}
