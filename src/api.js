import axios from "axios";

const newsAPI = axios.create({
  baseURL: "https://prigg-news-api.onrender.com/api",
});

export async function fetchAllArticlesSortedByDate() {
  try {
    const res = await newsAPI.get("/articles", {
      params: {
        sort_by: "created_at",
      },
    });
    return res.data.articles;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchArticleById(article_id) {
  try {
    const res = await newsAPI.get(`/articles/${article_id}`, {
      params: {
        sort_by: "created_at",
      },
    });
    return res.data.article;
  } catch (err) {
    console.log(err);
  }
}
