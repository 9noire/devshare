import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Button from '../components/Button.jsx';
import { showConfirm, showSuccess } from '../components/SweetAlert.jsx';
import axiosInstance from '../utils/axiosInstance.js';

function ArticleCard({ article, showActions = false }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const currentUser = token ? jwtDecode(token) : null;
  const isOwner = currentUser && article.author?._id === currentUser.id;

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/article/${article._id}/edit`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    const result = await showConfirm(
      'Hapus Artikel?',
      'Artikel ini akan dihapus secara permanen dan tidak dapat dikembalikan.'
    );

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/articles/${article._id}`);
        await showSuccess('Terhapus!', 'Artikel berhasil dihapus');
        window.location.reload();
      } catch (err) {
        const message = err.response?.data?.message || 'Gagal menghapus artikel';
        await showSuccess('Error', message, 'error');
      }
    }
  };

  const goToDetail = () => {
    navigate(`/article/${article._id}`);
  };

  return (
    <div
      className="border border-gray-300 p-6 hover:bg-gray-50 transition cursor-pointer"
      onClick={goToDetail}
    >
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover mb-4 rounded"
        />
      )}

      <h2 className="text-xl font-semibold mb-2">{article.title}</h2>

      <p className="text-gray-600 text-sm mb-3">
        by {article.author?.username || 'Anonymous'} •{' '}
        {new Date(article.createdAt).toLocaleDateString('id-ID')}
      </p>

      <p className="text-gray-800 line-clamp-3 mb-4">{article.content}</p>

      {article.tags && article.tags.length > 0 && (
        <div className="mb-6 flex gap-2 flex-wrap">
          {article.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-200 px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      )}

      {(showActions || isOwner) && isOwner && (
        <div
          className="mt-6 flex gap-3 justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          <Button onClick={handleEdit} className="px-5 py-2 text-sm">
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            className="px-5 py-2 text-sm bg-gray-600 hover:bg-gray-700"
          >
            Hapus
          </Button>
        </div>
      )}
    </div>
  );
}

export default ArticleCard;