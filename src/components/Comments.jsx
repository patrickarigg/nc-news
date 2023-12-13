import { useState } from "react";
import CommentCard from "./CommentCard";
import { postNewComment } from "../api";

function Comments({ article_id, comments, setComments }) {
  const [commentInput, setCommentInput] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [commentError, setCommentError] = useState(false);
  function updateCommentInput(event) {
    setCommentInput(event.target.value);
  }

  function handleCommentPost(event) {
    event.preventDefault();
    if (commentInput) {
      setDisabled(true);
      console.log("POSTING COMMENT");
      postNewComment(article_id, "grumpy19", commentInput)
        .then((comment) => {
          setComments((currValue) => {
            return [comment, ...currValue];
          });
          setCommentInput("");
        })
        .catch(() => {
          setCommentError(true);
        })
        .finally(() => {
          setDisabled(false);
          setTimeout(() => {
            setCommentError(false);
          }, 2000);
        });
    }
  }

  return (
    <section className="comments">
      <form className="comment-form">
        <hr />
        <label>
          <strong>Leave a comment:</strong>
          <br />
          <textarea
            onChange={updateCommentInput}
            name="postContent"
            rows={4}
            cols={35}
            value={commentInput}
          />
        </label>
        <button disabled={disabled} onClick={handleCommentPost}>
          Post
        </button>
      </form>
      {comments.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </section>
  );
}

export default Comments;
