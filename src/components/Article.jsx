import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api";

function Article() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id)
      .then((foundArticle) => {
        console.log(foundArticle);
        setCurrArticle(foundArticle);
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
      <img
        src={currArticle.article_img_url}
        alt={`Image for article ${currArticle.article_id}`}
      ></img>
      <h2>{currArticle.title}</h2>
      <p>
        <strong>By {currArticle.author}</strong>
      </p>
      <p>
        {currArticle.comment_count} comments | {currArticle.votes} votes
      </p>
      <p>{currArticle.body}</p>
    </article>
  );
}

export default Article;
