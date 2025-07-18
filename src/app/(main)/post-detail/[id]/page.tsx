import PostDetail from "@/components/post-detail/PostDetail";
import { getPostById } from "@/lib/actions/getPostById";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Post Detail",
  description: "View the details of a specific post",
};

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) return notFound();

  return (
    <div className="post-detail-holder">
      <PostDetail post={post} />
    </div>
  );
}
