import { useEffect, useState } from "react";
import Home from "./Home";
import { fetchAllArticlesSortedByDate } from "../api";
import { Routes, Route } from "react-router-dom";
import Article from "./Article";

function Display() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchAllArticlesSortedByDate()
      .then((foundArticles) => {
        console.log(foundArticles);
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
    <>
      <Routes>
        <Route path="/" element={<Home articles={articles} />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
    </>
  );
}

export default Display;
