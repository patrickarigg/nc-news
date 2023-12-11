function ArticleCard({ article }) {
  const date = new Date(Date.parse(article.created_at));
  console.log(date.toDateString());
  return (
    <article className="article-card">
      <img src={article.article_img_url}></img>
      <p>
        <strong>{article.title}</strong>
      </p>
      <p>Posted on {date.toDateString()}</p>
      <p>By {article.author}</p>
      <p>
        comments: {article.comment_count} | votes: {article.votes}
      </p>
    </article>
  );
}

export default ArticleCard;
