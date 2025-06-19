import PostList from "@/components/home/PostList";

export const metadata = {
  title: "Home",
  description: "View the latest posts and updates",
};

const page = () => {
  return (
    <div className="scroll-area">
      <PostList />
    </div>
  );
};
export default page;
