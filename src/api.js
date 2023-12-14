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

export async function incrementArticleVote(article_id, inc_votes) {
  const res = await newsAPI.patch(`/articles/${article_id}`, {
    inc_votes,
  });
  return res.data.updatedArticle;
}

export async function postNewComment(article_id, username, commentBody) {
  const res = await newsAPI.post(`/articles/${article_id}/comments`, {
    username: username,
    body: commentBody,
  });
  return res.data.comment;
}

export async function deleteCommentById(comment_id) {
  const res = await newsAPI.delete(`/comments/${comment_id}`);
  return res;
}

export async function fetchArticlesByQuery(searchParams) {
  const res = await newsAPI.get(`/articles`, {
    params: {
      topic: searchParams.get("topic"),
      sort_by: searchParams.get("sort_by"),
      order: searchParams.get("order"),
    },
  });
  return res.data.articles;
}

export async function fetchAllTopics() {
  const res = await newsAPI.get(`/topics`);
  return res.data.topics;
}
