import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ArticleCard from "../fragments/ArticleCard";
import SelectTags from "../components/SelectTags";

const API_URL = "http://localhost:5000/api";

function Article() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/articles`)
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        (article.tags &&
          article.tags.some((tag) =>
            tag.toLowerCase().includes(query)
          ));

      const matchTags =
        selectedTags.length === 0 ||
        (article.tags &&
          selectedTags.some((tag) =>
            article.tags.includes(tag)
          ));

      return matchSearch && matchTags;
    });
  }, [articles, query, selectedTags]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading articles...</p>;
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          {query ? `Hasil pencarian: "${query}"` : "Latest Articles"}
        </h1>
        <p className="text-gray-600 mt-2">
          Filter by Categories
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-10">
        <SelectTags
          selectedTags={selectedTags}
          onChange={setSelectedTags}
        />
      </div>

      {filteredArticles.length === 0 ? (
        <p className="text-center text-gray-600">
          Tidak ada artikel yang sesuai dengan filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Article;
