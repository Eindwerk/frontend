"use server";

import { followEntity } from "./followEntity";
import { unFollowEntity } from "./unFollowEntity";
import { checkFollow } from "./checkFollowing";
import { getUserMe } from "./getUserMe";

export async function toggleFollow(
  _prevState: { success: boolean },
  formData: FormData
): Promise<{
  success: boolean;
  message?: string;
}> {
  const followableType = formData.get("followable_type") as string;
  const followableId = Number(formData.get("followable_id"));

  const userId = await getUserMe();
  if (!userId) return { success: false, message: "Gebruiker niet ingelogd." };

  // Controleer of deze gebruiker deze entiteit al volgt
  const alreadyFollowed = await checkFollow(followableId);

  if (alreadyFollowed) {
    const result = await unFollowEntity(followableType, followableId);
    return result?.success
      ? { success: false, message: "Ontvolgd." }
      : { success: true, message: result?.message || "Ontvolgen mislukt." };
  } else {
    const result = await followEntity(followableType, followableId);
    return result?.success
      ? { success: true, message: "Gevolgd." }
      : { success: false, message: result?.message || "Volgen mislukt." };
  }
}
