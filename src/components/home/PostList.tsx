import Post from "./Post";

// TODO: map vanuit de api, als geen post dan placeholder "No posts yet :("

const PostList = () => {
  return (
    <div className="post-list">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};
export default PostList;
