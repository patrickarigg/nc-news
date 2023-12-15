import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Article from "./Article";
import Articles from "./Articles";
import Error from "./Error";
import SignIn from "./SignIn";

function Display() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/users" element={<></>} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/users/:user_id" element={<></>} />
        <Route
          path="*"
          element={
            <Error
              title="404 Page Not Found"
              msg="Sorry, this page doesn't exist yet... 😢"
            />
          }
        />
      </Routes>
    </>
  );
}

export default Display;
