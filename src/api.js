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
    const res = await newsAPI.get(`/articles/${article_id}`);
    return res.data.article;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchCommentsForArticle(article_id) {
  try {
    const res = await newsAPI.get(`/articles/${article_id}/comments`);
    return res.data.comments;
  } catch (err) {
    console.log(err);
  }
}