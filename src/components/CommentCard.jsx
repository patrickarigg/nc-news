function CommentCard({ comment }) {
  const date = new Date(Date.parse(comment.created_at));
  return (
    <section className="comment-card">
      <p>
        <strong>{comment.author}</strong>
        <span className="comment-date"> on {date.toDateString()}</span>
      </p>
      <p>{comment.body}</p>
    </section>
  );
}

export default CommentCard;
