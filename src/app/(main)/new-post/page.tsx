import NewPostForm from "@/components/newpost-page/NewPostForm";

export const metadata = {
  title: "New Post",
  description: "Create a new post with an image and details",
};

export default function NewPostPage() {
  return <NewPostForm />;
}
