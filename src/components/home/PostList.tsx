"use client";

import { useEffect, useState } from "react";
import Post from "./Post";
import { getAllPost } from "@/lib/actions/getAllPosts";
import type { Post as PostType } from "@/types/post";
import Button from "../ui/Button";
import Text from "../ui/Text";

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 10;

const PostList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllPost();
      setPosts(data ?? []);
    };

    fetchPosts();
  }, []);

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div className="post-list-wrapper">
      {visiblePosts.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Text variant="bold-blue-17">Loading...</Text>
        </div>
      ) : (
        <div className="post-list">
          {visiblePosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}

      {visibleCount < posts.length && (
        <div className="post-list__more">
          <Button onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}>
            Toon meer
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostList;
