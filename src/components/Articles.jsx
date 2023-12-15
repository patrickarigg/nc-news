import { useEffect, useState } from "react";
import { fetchAllTopics, fetchArticlesByQuery } from "../api";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import Error from "./Error";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allTopics, setAllTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") || undefined;
  const sortBy = searchParams.get("sort_by") || undefined;
  const order = searchParams.get("order") || "desc";
  const [invalidTopicError, setInvalidTopicError] = useState(false);

  function handleTopicChange(event) {
    const newParams = new URLSearchParams(searchParams);
    if (event.target.value === "All topics") {
      newParams.delete("topic");
      setSearchParams(newParams);
    } else {
      newParams.set("topic", event.target.value);
      setSearchParams(newParams);
    }
  }

  function handleSortByChange(event) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", event.target.value);
    setSearchParams(newParams);
  }

  function handleOrderChange(event) {
    const newParams = new URLSearchParams(searchParams);
    const newOrder = order == "asc" ? "desc" : "asc";
    newParams.set("order", newOrder);
    setSearchParams(newParams);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchAllTopics()
      .then((topics) => {
        setAllTopics(topics.map((topic) => topic.slug));
        if (topic && !allTopics.includes(topic)) {
          setInvalidTopicError(true);
          return Promise.reject();
        }
        return fetchArticlesByQuery(searchParams);
      })
      .then((foundArticles) => {
        setArticles(foundArticles);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (invalidTopicError) {
    return <Error title="404 Topic Not Found" />;
  }
  return (
    <main>
      <h2>Articles</h2>

      <select name="topic" value={topic} onChange={handleTopicChange}>
        <option value={undefined}>All topics</option>
        {allTopics.map((topic, index) => {
          return (
            <option key={index} value={topic}>
              {topic}
            </option>
          );
        })}
      </select>
      <select name="sort_by" value={sortBy} onChange={handleSortByChange}>
        <option value={"created_at"}>sort by date</option>
        <option value={"comment_count"}>sort by comments</option>
        <option value={"votes"}>sort by votes</option>
      </select>
      <button id="sort-order-button" value={order} onClick={handleOrderChange}>
        {order === "desc" ? "⬇" : "⬆"}
      </button>

      <section className="articles">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </section>
    </main>
  );
}

export default Articles;
