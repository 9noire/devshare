import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ArticleCard from '../fragments/ArticleCard.jsx';

const API_URL = 'http://localhost:5000/api'

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');

    setLoading(true);

    if (query) {
      
      axios.get(`${API_URL}/articles`)
        .then(res => {
          const filtered = res.data.filter(article =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.content.toLowerCase().includes(query.toLowerCase()) ||
            (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
          );
          setArticles(filtered);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      
      axios.get(`${API_URL}/articles`)
        .then(res => {
          setArticles(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [location.search]);

  if (loading) return <p className="text-center">Loading articles...</p>;

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">
        {query ? `Hasil pencarian: "${query}"` : 'Latest Articles'}
      </h1>

      {articles.length === 0 ? (
        <p className="text-center text-gray-600">
          {query ? 'Tidak ada artikel yang cocok dengan pencarianmu.' : 'Belum ada artikel.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;