import { useContext, useState } from "react";
import CommentCard from "./CommentCard";
import { postNewComment } from "../api";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";

function Comments({ article_id, comments, setComments }) {
  const [commentInput, setCommentInput] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const { user } = useContext(UserContext);

  function updateCommentInput(event) {
    setCommentInput(event.target.value);
  }

  function handleCommentPost(event) {
    event.preventDefault();
    if (commentInput) {
      setDisabled(true);
      console.log("POSTING COMMENT");
      postNewComment(article_id, user, commentInput)
        .then((comment) => {
          setComments((currValue) => {
            return [comment, ...currValue];
          });
          setCommentInput("");
        })
        .catch((err) => {
          console.log(err);
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
      {user ? (
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
          {commentError ? (
            <p className="error-message">
              Error when posting comment, please retry.
            </p>
          ) : null}
        </form>
      ) : (
        <p>
          To leave a comment, please <Link to="/sign-in">sign in</Link>.
        </p>
      )}

      {comments.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </section>
  );
}

export default Comments;
