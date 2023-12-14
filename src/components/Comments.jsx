import { useContext, useState } from "react";
import CommentCard from "./CommentCard";
import { postNewComment } from "../api";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";

function Comments({ article_id, comments, setComments }) {
  const [commentInput, setCommentInput] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [commentPostError, setCommentPostError] = useState(false);
  const [commentLengthError, setCommentLengthError] = useState(false);
  const { user } = useContext(UserContext);
  const MAXCHAR = 100;
  function updateCommentInput(event) {
    setCommentInput(event.target.value);
    if (commentInput.length === 0) {
      setDisabled(true);
    } else if (commentInput.length > MAXCHAR) {
      setCommentLengthError(true);
      setDisabled(true);
    } else {
      setCommentLengthError(false);
      setDisabled(false);
    }
  }

  function handleCommentPost(event) {
    event.preventDefault();
    if (commentInput) {
      setDisabled(true);
      postNewComment(article_id, user, commentInput)
        .then((comment) => {
          setComments((currValue) => {
            return [comment, ...currValue];
          });
          setCommentInput("");
        })
        .catch((err) => {
          console.log(err);
          setCommentPostError(true);
        })
        .finally(() => {
          setDisabled(false);
          setTimeout(() => {
            setCommentPostError(false);
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
          {commentLengthError ? (
            <p className="error-message">
              {`comment must be less that ${MAXCHAR} characters.`}
            </p>
          ) : null}
          {commentPostError ? (
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
        return (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            setComments={setComments}
          />
        );
      })}
    </section>
  );
}

export default Comments;
