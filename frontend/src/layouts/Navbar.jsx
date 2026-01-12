import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/article?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <header className="border-b border-gray-300 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            ./DevShare
          </Link>

          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-96">
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-400 focus:outline-none focus:border-black transition text-sm"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-black text-white hover:bg-gray-800 transition flex items-center justify-center"
              aria-label="Cari"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
          </form>

          <nav className="flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-gray-600 transition">
              Home
            </Link>
            <Link to="/article" className="hover:text-gray-600 transition">
              Article
            </Link>

            {token ? (
              <>
                <Link to="/profile" className="hover:text-gray-600 transition">
                  Profile
                </Link>
                <Link to="/article/create" className="hover:text-gray-600 transition">
                  Create
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-600 transition">
                  Login
                </Link>
                <Link to="/register" className="hover:text-gray-600 transition">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;