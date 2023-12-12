import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  const date = new Date(Date.parse(article.created_at));
  return (
    <article className="article-card">
      <img src={article.article_img_url}></img>
      <Link to={`/articles/${article.article_id}`}>
        <strong>{article.title}</strong>
      </Link>
      <p>Posted on {date.toDateString()}</p>
      <p>By {article.author}</p>
      <p>
        comments: {article.comment_count} | votes: {article.votes}
      </p>
    </article>
  );
}

export default ArticleCard;
