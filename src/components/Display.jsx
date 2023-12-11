import { useEffect, useState } from "react";
import Home from "./Home";
import { fetchAllArticlesSortedByDate } from "../api";

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
      <Home articles={articles} />
    </>
  );
}

export default Display;
