import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchArticleById,
  fetchCommentsForArticle,
  incrementArticleVote,
} from "../api";
import Comments from "./Comments";

function Article() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userArticleVote, setUserArticleVote] = useState(0);
  const [voteError, setVoteError] = useState(false);

  function handleArticleVote(event) {
    const inc_votes = event.target.id === "article-up-vote" ? 1 : -1;
    const newVote = userArticleVote + inc_votes;

    if (newVote <= 1 && newVote >= -1) {
      setUserArticleVote(newVote);
      setCurrArticle((currVal) => {
        const updatedVal = { ...currVal };
        updatedVal.votes += inc_votes;
        return updatedVal;
      });
      incrementArticleVote(article_id, inc_votes).catch((err) => {
        setUserArticleVote(newVote - inc_votes);
        setCurrArticle((currVal) => {
          const updatedVal = { ...currVal };
          updatedVal.votes -= inc_votes;
          return updatedVal;
        });
        setVoteError(true);
        setTimeout(() => {
          setVoteError(false);
        }, 2000);
      });
    }
  }

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
      <button
        id="article-up-vote"
        className={userArticleVote == 1 ? "vote-button-pressed" : "vote-button"}
        onClick={handleArticleVote}
      >
        👍
      </button>
      <button
        id="article-down-vote"
        className={
          userArticleVote == -1 ? "vote-button-pressed" : "vote-button"
        }
        onClick={handleArticleVote}
      >
        👎
      </button>
      {voteError ? (
        <p className="error-message">Error, please try voting again</p>
      ) : null}
      <Comments
        article_id={currArticle.article_id}
        comments={comments}
        setComments={setComments}
      />
    </article>
  );
}

export default Article;
