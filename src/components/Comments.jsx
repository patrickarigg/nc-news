import CommentCard from "./CommentCard";

function Comments({ article_id, comments }) {
  return (
    <section className="comments">
      <form className="comment-form">
        <hr />
        <label>
          <strong>Leave a comment:</strong>
          <br />
          <textarea name="postContent" rows={4} cols={35} />
        </label>
        <button type="submit">Post</button>
      </form>
      {comments.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </section>
  );
}

export default Comments;
