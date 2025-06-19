"use client";

import Image from "next/image";
import { HeartIcon } from "lucide-react";
import Text from "../ui/Text";
import { Post } from "@/types/post";
import { getUserMe } from "@/lib/actions/getUserMe";
import { toggleLike } from "@/lib/actions/toggleLike";
import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "@/types/user";
import { getPostById } from "@/lib/actions/getPostById";
import { getUserById } from "@/lib/actions/getUserById";
import { slugify } from "@/lib/utils/slugify";

const PostDetail = ({ post }: { post: Post }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserMe();
      const userId = user?.id;
      setUserId(userId);

      const alreadyLiked = post.likes.some(
        (like) => Number(like.user_id) === userId
      );
      setLiked(alreadyLiked);
    };

    fetchUser();
  }, [post.likes]);

  useEffect(() => {
    const fetchData = async () => {
      const [user, fullPost] = await Promise.all([
        getUserMe(),
        getPostById(post.id),
      ]);

      setUserId(user?.id ?? null);

      const alreadyLiked =
        fullPost && fullPost.likes
          ? fullPost.likes.some((like) => Number(like.user_id) === user?.id)
          : false;
      setLiked(alreadyLiked);
    };

    const fetchUser = async () => {
      const data = await getUserById(post.user_id);
      setUserInfo(data);
    };

    fetchData();
    fetchUser();
  }, [post.id, post.user_id]);

  const handleLike = async () => {
    if (processing || userId === null) return;
    setProcessing(true);

    const result = await toggleLike(post.id, liked);
    if (result.success) {
      setLiked((prev) => !prev);
    } else {
      console.error("Toggle failed:", result.message);
    }

    setProcessing(false);
  };

  return (
    <div className="post-detail">
      <Link
        href={
          userInfo
            ? `/profile/user/${post.user_id}/${slugify(userInfo.name)}`
            : "#"
        }
      >
        <div className="user">
          <div className="user__profile-image">
            <Image
              src={
                userInfo?.profile_image ??
                "https://groundpass-storage.ams3.digitaloceanspaces.com/fallback/fall-back-profile-image.png"
              }
              alt="User Profile"
              className="user__profile-image"
              fill
              sizes="100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="user__profile-name">
            <Text variant="subtext-white-12">{userInfo?.name ?? ""}</Text>
          </div>
        </div>
        <div className="user-background"></div>
      </Link>
      <div className="post-detail__image-holder">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="100"
          priority
          className="post-detail__image-holder__image"
        />
      </div>
      <div className="post-detail__description">
        <div className="post-detail__description__text">
          <div className="post-detail__description__text__title">
            <Text variant="bold-blue-17">{post.title}</Text>
          </div>
          <div className="post-detail__description__text__stadium">
            <Text variant="subtext-spaceblue-12">
              {post.game?.stadium?.name}
            </Text>
          </div>
        </div>
        <div className="post-detail__description__icons">
          <HeartIcon
            strokeWidth={1}
            fill={liked ? "#0344dc" : "none"}
            onClick={handleLike}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
