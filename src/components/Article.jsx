import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchCommentsForArticle } from "../api";
import Comments from "./Comments";

function Article() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id)
      .then((foundArticle) => {
        setCurrArticle(foundArticle);
        return fetchCommentsForArticle(article_id);
      })
      .then((foundComments) => {
        setComments(foundComments);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <article className="single-article">
      <div id="article-img-container">
        <img
          src={currArticle.article_img_url}
          alt={`Image for article ${currArticle.article_id}`}
        ></img>
      </div>
      <h2>{currArticle.title}</h2>
      <p>
        <strong>By {currArticle.author}</strong>
      </p>
      <p>
        {currArticle.comment_count} comments | {currArticle.votes} votes
      </p>
      <p>{currArticle.body}</p>
      <Comments article_id={currArticle.article_id} comments={comments} />
    </article>
  );
}

export default Article;
