import { useEffect, useState } from "react";
import { fetchAllArticlesSortedByDate } from "../api";
import ArticleCard from "./ArticleCard";

function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchAllArticlesSortedByDate()
      .then((foundArticles) => {
        setArticles(foundArticles);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <main>
      <h2>Latest News</h2>
      <section className="articles">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </section>
    </main>
  );
}

export default Home;
