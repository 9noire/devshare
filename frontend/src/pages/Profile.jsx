import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../utils/axiosInstance.js';
import ArticleCard from '../fragments/ArticleCard.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { showSuccess } from '../components/SweetAlert.jsx';

function Profile() {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  
  const currentUser = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }, [token]);

  useEffect(() => {
    if (!token || !currentUser?.id) {
      navigate('/login');
      return;
    }

    const userId = currentUser.id;
    console.log('Fetching user with ID:', userId); 

    
    axiosInstance.get(`/users/${userId}`)
      .then(res => {
        console.log('User fetched:', res.data); 
        setUser(res.data);
        
        if (!editingUsername) {
          setNewUsername(res.data.username);
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err);
        
        navigate('/login');
      });

    
    axiosInstance.get(`/users/${userId}/articles`)
      .then(res => {
        console.log('Articles fetched:', res.data.articles.length); 
        setArticles(res.data.articles);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setArticles([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, currentUser?.id, navigate, editingUsername]); 

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      showSuccess('Error', 'Username tidak boleh kosong', 'error');
      return;
    }

    setUpdating(true);
    try {
      const res = await axiosInstance.patch('/users/me/username', {
        username: newUsername.trim()
      });

      console.log('Username updated to:', res.data.username); 
      setUser(prev => ({ ...prev, username: res.data.username }));
      setEditingUsername(false);
      await showSuccess('Berhasil!', 'Username berhasil diubah');
    } catch (err) {
      console.error('Update username error:', err); 
      const message = err.response?.data?.message || 'Gagal mengubah username';
      await showSuccess('Error', message, 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleEditClick = () => {
    setEditingUsername(true);
    setNewUsername(user?.username || ''); 
    console.log('Edit clicked, newUsername set to:', user?.username); 
  };

  const handleCancel = () => {
    setEditingUsername(false);
    setNewUsername(user?.username || ''); 
  };

  if (loading) {
    return <p className="text-center">Memuat profil...</p>;
  }

  if (!user) {
    return <p className="text-center">Profil tidak ditemukan. <button onClick={() => navigate('/login')} className="underline">Login ulang</button></p>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      <div className="mb-12 border-b pb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold flex items-center gap-3">
              {user.username}
              <button
                onClick={handleEditClick}
                className="text-sm px-4 py-1 border border-black hover:bg-black hover:text-white transition"
              >
                Ubah Username
              </button>
            </h2>
            <p className="text-gray-600 text-lg mt-2">{user.email}</p>
            <p className="text-sm text-gray-500 mt-2">
              Bergabung pada {new Date(user.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        {editingUsername && (
          <form onSubmit={handleUpdateUsername} className="mt-6 max-w-md">
            <div className="flex gap-3 items-end">
              <Input
                type="text"
                value={newUsername}
                onChange={(e) => {
                  console.log('Input change:', e.target.value); 
                  setNewUsername(e.target.value);
                }}
                placeholder="Username baru"
                className={`flex-1 ${!newUsername.trim() ? 'border-red-500' : ''}`}
                autoFocus
                required
              />
              <Button type="submit" disabled={updating || !newUsername.trim()}>
                {updating ? 'Menyimpan...' : 'Simpan'}
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700"
                disabled={updating}
              >
                Batal
              </Button>
            </div>
            {!newUsername.trim() && (
              <p className="text-red-600 text-sm mt-1">Username tidak boleh kosong</p>
            )}
          </form>
        )}
      </div>

      <h3 className="text-2xl font-semibold mb-6">My Articles</h3>

      {articles.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          Kamu belum membuat artikel apapun. 
          <a href="/article/create" className="text-black underline ml-2">Buat artikel pertama sekarang!</a>
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

export default Profile;