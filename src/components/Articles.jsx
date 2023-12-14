import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { fetchAllTopics, fetchArticlesByTopic } from "../api";
import { useSearchParams } from "react-router-dom";
function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allTopics, setAllTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";

  function handleTopicChange(event) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", event.target.value);
    if (event.target.value === "All topics") {
      setSearchParams(new URLSearchParams());
    } else {
      setSearchParams(newParams);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchAllTopics().then((topics) => {
      setAllTopics(topics.map((topic) => topic.slug));
    });
    fetchArticlesByTopic(topic)
      .then((foundArticles) => {
        setArticles(foundArticles);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topic]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <main>
      <h2>All Articles</h2>

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

      <section className="articles">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </section>
    </main>
  );
}

export default Articles;
