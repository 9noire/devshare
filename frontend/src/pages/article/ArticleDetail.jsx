import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../utils/axiosInstance.js';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';
import { showSuccess, showConfirm } from '../../components/SweetAlert.jsx';
import { Heart } from 'lucide-react';

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const token = localStorage.getItem('token');
  const currentUser = token ? jwtDecode(token) : null;
  const isOwner = currentUser && article?.author?._id === currentUser.id;
  const isLiked = article?.likes?.some(like => like.toString() === currentUser?.id);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const res = await axiosInstance.get(`/articles/${id}`);
      setArticle(res.data);
      setLoading(false);
    } catch (err) {
      await showSuccess('Error', 'Artikel tidak ditemukan', 'error');
      navigate('/');
    }
  };

  const handleLike = async () => {
    if (!token) {
      await showSuccess('Login diperlukan', 'Silakan login untuk like artikel', 'info');
      navigate('/login');
      return;
    }

    try {
      await axiosInstance.post(`/articles/${id}/like`);
      setArticle(prev => ({
        ...prev,
        likes: prev.likes.some(l => l.toString() === currentUser.id)
          ? prev.likes.filter(l => l.toString() !== currentUser.id)
          : [...prev.likes, currentUser.id]
      }));
    } catch (err) {
      await showSuccess('Error', 'Gagal like artikel', 'error');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!token) {
      await showSuccess('Login diperlukan', 'Silakan login untuk berkomentar', 'info');
      navigate('/login');
      return;
    }

    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const res = await axiosInstance.post(`/articles/${id}/comments`, {
        comment: commentText
      });

      setArticle(prev => ({
        ...prev,
        comments: [...prev.comments, res.data]
      }));
      setCommentText('');
      await showSuccess('Komentar ditambahkan!', '');
    } catch (err) {
      await showSuccess('Error', 'Gagal menambah komentar', 'error');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteArticle = async () => {
    const result = await showConfirm('Hapus Artikel?', 'Artikel ini akan dihapus permanen.');
    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/articles/${id}`);
        await showSuccess('Artikel dihapus!', '');
        navigate('/');
      } catch (err) {
        await showSuccess('Error', 'Gagal menghapus artikel', 'error');
      }
    }
  };

  if (loading) return <p className="text-center">Memuat artikel...</p>;
  if (!article) return <p className="text-center">Artikel tidak ditemukan.</p>;

  return (
    <div className="max-w-4xl mx-auto">
      {article.image && (
        <img src={article.image} alt={article.title} className="w-full h-96 object-cover mb-8" />
      )}

      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

      <p className="text-gray-600 mb-6">
        by <span className="font-medium text-black">{article.author?.username || 'Anonymous'}</span> •{' '}
        {new Date(article.createdAt).toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric'
        })}
      </p>

      <div className="mb-8 flex items-center gap-4">
        <Button
          onClick={handleLike}
          className={`px-6 py-3 flex items-center gap-2 ${isLiked ? 'bg-black text-black' : 'bg-gray-600 border-black text-black hover:bg-gray-100'
            }`}
        >
          <Heart
            size={20}
            strokeWidth={2}
            className={isLiked ? 'fill-current' : 'fill-none'}
          />
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </Button>
        <span className="text-lg font-medium">{article.likes?.length || 0} Likes</span>
      </div>

      <div className="prose max-w-none text-lg leading-relaxed mb-12 whitespace-pre-wrap">
        {article.content}
      </div>

      {isOwner && (
        <div className="mb-12 flex gap-4 justify-center border-b pb-8">
          <Button onClick={() => navigate(`/article/${id}/edit`)}>
            Edit Artikel
          </Button>
          <Button
            onClick={handleDeleteArticle}
            className="bg-gray-600 hover:bg-gray-700"
          >
            Hapus Artikel
          </Button>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Komentar ({article.comments?.length || 0})</h2>

        {token ? (
          <form onSubmit={handleAddComment} className="mb-8 flex gap-3">
            <Input
              placeholder="Tulis komentar..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={submittingComment}>
              {submittingComment ? 'Mengirim...' : 'Kirim'}
            </Button>
          </form>
        ) : (
          <p className="mb-8 text-gray-600">
            <a href="/login" className="text-black underline">Login</a> untuk berkomentar.
          </p>
        )}

        {article.comments?.length === 0 ? (
          <p className="text-gray-600">Belum ada komentar. Jadilah yang pertama!</p>
        ) : (
          <div className="space-y-6">
            {article.comments.map((cmt, i) => (
              <div key={i} className="border-l-4 border-black pl-4 py-2">
                <p className="font-medium">{cmt.user?.username || 'Anonymous'}</p>
                <p className="text-gray-800 mt-1">{cmt.comment}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(cmt.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleDetail;