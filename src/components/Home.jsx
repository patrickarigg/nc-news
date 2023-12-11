import ArticleCard from "./ArticleCard";

function Home({ articles }) {
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
