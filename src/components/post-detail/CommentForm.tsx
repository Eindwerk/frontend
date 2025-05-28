import { MessageCircleReply } from "lucide-react";

const CommentForm = () => {
  return (
    <div className="comment-form">
      <div className="comment-form__input-holder">
        <input type="text" className="bold-space-17" />
      </div>
      <div className="comment-form__button-holder">
        <MessageCircleReply strokeWidth={0.5} />
      </div>
    </div>
  );
};
export default CommentForm;
