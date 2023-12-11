import { useEffect, useState } from "react";
import Home from "./Home";
import { fetchAllArticlesSortedByDate } from "../api";

function Display() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchAllArticlesSortedByDate().then((foundArticles) => {
      console.log(foundArticles);
      setArticles(foundArticles);
    });
  }, []);

  return (
    <>
      <Home articles={articles} />
    </>
  );
}

export default Display;
