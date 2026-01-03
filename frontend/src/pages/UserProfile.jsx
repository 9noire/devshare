import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArticleCard from '../fragments/ArticleCard.jsx';

const API_URL = 'http://localhost:5000/api';

function UserProfile() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const res = await axios.get(`${API_URL}/users/${id}`);
        setUser(res.data);

        
        const articlesRes = await axios.get(`${API_URL}/users/${id}/articles`);
        setArticles(articlesRes.data.articles);
      } catch (err) {
        console.error('Error fetching user:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (!user) return <p className="text-center">User tidak ditemukan.</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold mb-2">{user.username}</h1>
        <p className="text-gray-600">Bergabung pada {new Date(user.createdAt).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}</p>
      </div>

      <h2 className="text-3xl font-semibold mb-8">Artikel oleh {user.username}</h2>

      {articles.length === 0 ? (
        <p className="text-gray-600">Belum ada artikel.</p>
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

export default UserProfile;