import { getAllPost } from "@/lib/actions/getAllPosts";
import PostListClient from "./PostListClient"; // client component

const PostListServer = async () => {
  const posts = await getAllPost(); // ✅ fetch op server
  return <PostListClient initialPosts={posts} />;
};

export default PostListServer;
