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
    console.log(res);
    return res.data.articles;
  } catch (err) {
    console.log(err);
  }
}
