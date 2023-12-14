import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Article from "./Article";
import Articles from "./Articles";

function Display() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<></>} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/users" element={<></>} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="users/:user_id" element={<></>} />
      </Routes>
    </>
  );
}

export default Display;
