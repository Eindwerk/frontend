"use client";

import Image from "next/image";
import Text from "../ui/Text";
import { useState, useEffect } from "react";
import { HeartIcon } from "lucide-react";
import type { Post } from "@/types/post";
import Link from "next/link";
import { slugify } from "@/lib/utils/slugify";
import { getPostById } from "@/lib/actions/getPostById";
import { toggleLike } from "@/lib/actions/toggleLike";
import { getUserMe } from "@/lib/actions/getUserMe";
import { getUserById } from "@/lib/actions/getUserById";
import { User } from "@/types/user";

const Post = ({ post }: { post: Post }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [user, fullPost] = await Promise.all([
        getUserMe(),
        getPostById(post.id),
      ]);

      setUserId(user?.id ?? null);
      setPostDetails(fullPost);

      const alreadyLiked =
        fullPost && fullPost.likes
          ? fullPost.likes.some((like) => Number(like.user_id) === user?.id)
          : false;
      setLiked(alreadyLiked);
    };

    fetchData();
  }, [post.id]);

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

  useEffect(() => {
    const fetchData = async () => {
      const [user, fullPost] = await Promise.all([
        getUserMe(),
        getPostById(post.id),
      ]);

      setUserId(user?.id ?? null);
      setPostDetails(fullPost);

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

  if (!postDetails || !userInfo) return null;

  return (
    <div className="post">
      <Link
        href={`/profile/user/${postDetails.user_id}/${slugify(userInfo.name)}`}
      >
        <div className="user">
          <div className="user__profile-image">
            <Image
              src={
                userInfo.profile_image ??
                "https://groundpass-storage.ams3.digitaloceanspaces.com/fallback/fall-back-profile-image.png"
              }
              alt="User Profile"
              className="user__profile-image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="user__profile-name">
            <Text variant="subtext-white-12">{userInfo.name}</Text>
          </div>
        </div>
        <div className="user-background"></div>
      </Link>
      <div className="front__image">
        <Image
          priority
          src={post.image}
          alt="User Post"
          className="front__image__media"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="front__description">
        <div className="front__description__text">
          <div className="front__description__text__game">
            <Link
              href={`/profile/team/${postDetails.game.home_team_id}/${slugify(
                postDetails.game.home_team.name
              )}`}
            >
              <Text variant="bold-blue-17">{postDetails.title}</Text>
            </Link>
          </div>
          <div className="front__description__text__stadium">
            <Link
              href={`/profile/stadium/${postDetails.game.stadium.id}/${slugify(
                postDetails.game.stadium.name
              )}`}
            >
              <Text variant="subtext-spaceblue-12">
                {postDetails.game.stadium.name}
              </Text>
            </Link>
          </div>
        </div>

        <div className="front__description__icons">
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

export default Post;
