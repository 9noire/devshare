import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';
import Input from '../../components/Input.jsx';
import Textarea from '../../components/Textarea.jsx';
import Button from '../../components/Button.jsx';
import SelectTags from '../../components/SelectTags.jsx';
import { showSuccess } from '../../components/SweetAlert.jsx';

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    content: '',
    image: ''
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axiosInstance.get(`/articles/${id}`);
        const article = res.data;

        setForm({
          title: article.title,
          content: article.content,
          image: article.image || ''
        });

        setSelectedTags(article.tags || []);
        setImagePreview(article.image || '');
        setLoading(false);
      } catch (err) {
        await showSuccess('Error', 'Artikel tidak ditemukan', 'error');
        navigate('/');
      }
    };

    fetchArticle();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showSuccess('Error', 'File harus berupa gambar', 'error');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showSuccess('Error', 'Ukuran gambar maksimal 2MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setForm(prev => ({ ...prev, image: base64 }));
      setImagePreview(base64);
      showSuccess('Gambar diganti', 'Siap disimpan');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setForm(prev => ({ ...prev, image: '' }));
    setImagePreview('');
    document.getElementById('image-upload').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      showSuccess('Error', 'Judul dan konten wajib diisi', 'error');
      return;
    }

    setSubmitting(true);

    const payload = {
      title: form.title.trim(),
      content: form.content.trim(),
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      image: form.image || undefined
    };

    try {
      await axiosInstance.put(`/articles/${id}`, payload);
      await showSuccess('Success!', 'Artikel berhasil diperbarui');
      navigate(`/article/${id}`);
    } catch (err) {
      const message = err.response?.data?.message || 'Gagal memperbarui artikel';
      await showSuccess('Error', message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center">Memuat artikel...</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Edit Artikel</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-lg font-medium mb-2">Judul</label>
          <Input
            name="title"
            placeholder="Masukkan judul artikel"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Konten</label>
          <Textarea
            name="content"
            placeholder="Tulis isi artikel di sini..."
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Tags</label>
          <SelectTags selectedTags={selectedTags} onChange={setSelectedTags} />
          <p className="text-sm text-gray-600 mt-2">Pilih satu atau lebih tag</p>
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">
            Gambar (opsional, maks 2MB)
          </label>

          {!imagePreview ? (
            <div
              className="border-2 border-dashed border-gray-400 px-6 py-10 text-center cursor-pointer hover:border-black transition"
              onClick={() => document.getElementById('image-upload').click()}
            >
              <p className="text-gray-600">Klik untuk pilih gambar baru</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF • Maksimal 2MB</p>
            </div>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-96 object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:bg-gray-800 transition"
              >
                ×
              </button>
            </div>
          )}

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-700"
          >
            Batal
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditArticle;