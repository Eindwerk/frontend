import type { Post } from "@/types/post";
import { usePostImage } from "./usePostImage";
import { Game } from "@/types/game";

const EMPTY_POST: Post = {
  id: 0,
  user_id: 0,
  game: "" as unknown as Game,
  image: "",
  title: "",
  comments: [],
  likes: [],
  created_at: "",
  updated_at: "",
};

export function usePostInfo(post: Post | null) {
  const safePost = post ?? EMPTY_POST;

  const cleanedPost = {
    image: safePost.image || "", // image ipv image_path
  };

  const { imageSrc, previewImage, setPreviewImage, imageInputRef } =
    usePostImage(cleanedPost);

  return {
    isReady: !!post,
    imageSrc,
    previewImage,
    setPreviewImage,
    imageInputRef,
    // geen title, want bestaat niet in Post
  };
}
