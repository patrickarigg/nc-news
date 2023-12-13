import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteCommentById } from "../api";

function CommentCard({ comment, setComments }) {
  const { user, setUser } = useContext(UserContext);
  const date = new Date(Date.parse(comment.created_at));
  const [deleteError, setDeleteError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function handleDeleteComment(event) {
    event.preventDefault();
    const idToDelete = event.target.id;
    setDisabled(true);
    deleteCommentById(idToDelete)
      .then(() => {
        setComments((currVal) => {
          return currVal.filter((comment) => comment.comment_id != idToDelete);
        });
      })
      .catch(() => {
        setDeleteError(true);
      })
      .finally(() => {
        setDisabled(false);
        setTimeout(() => {
          setDeleteError(false);
        }, 2000);
      });
  }

  return (
    <section className="comment-card">
      <p>
        <strong>{comment.author}</strong>
        <span className="comment-date"> on {date.toDateString()}</span>
        {comment.author === user ? (
          <button
            disabled={disabled}
            onClick={handleDeleteComment}
            id={comment.comment_id}
          >
            ❌
          </button>
        ) : null}
      </p>
      <p>{comment.body}</p>
      {deleteError ? (
        <p className="error-message">
          Failed to delete message. Please try again.
        </p>
      ) : null}
    </section>
  );
}

export default CommentCard;
