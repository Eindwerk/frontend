import PostListServer from "@/components/home/PostListServer";

export const metadata = {
  title: "Home",
  description: "View the latest posts and updates",
};

const page = () => {
  return (
    <div className="scroll-area">
      <PostListServer />
    </div>
  );
};

export default page;
