"use client";

import { useRef, useState } from "react";
import { MessageCircleReply } from "lucide-react";
import { addCommentonPost } from "@/lib/actions/addCommentOnPost";

const CommentForm = ({ postId }: { postId: number }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (!value) return;

    setIsSubmitting(true);
    setError(null);

    const result = await addCommentonPost(postId, value);

    if (!result?.success) {
      setError(result?.message || "Er ging iets mis");
    } else {
      if (inputRef.current) inputRef.current.value = "";
    }

    setIsSubmitting(false);
  };

  return (
    <form className="comment-form" onSubmit={handleCommentSubmit}>
      <div className="comment-form__input-holder">
        <input
          type="text"
          className="bold-space-17"
          ref={inputRef}
          placeholder="Typ je reactie..."
          disabled={isSubmitting}
        />
      </div>
      <div className="comment-form__button-holder">
        <button
          type="submit"
          aria-label="Add comment"
          disabled={isSubmitting}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          <MessageCircleReply strokeWidth={0.5} />
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  );
};

export default CommentForm;
