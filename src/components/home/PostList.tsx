import Post from "./Post";
import { getAllPost } from "@/lib/actions/getAllPosts";

// TODO: map vanuit de api, als geen post dan placeholder "No posts yet :("

const PostList = async () => {
  const posts = await getAllPost();

  if (!posts || posts.length === 0) {
    return <div>No posts yet :(</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
