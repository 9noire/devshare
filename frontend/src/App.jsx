import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar.jsx';
import Footer from './layouts/Footer.jsx';
import Article from './pages/Article.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Profile from './pages/Profile.jsx';
import ArticleDetail from './pages/article/ArticleDetail.jsx';
import CreateArticle from './pages/article/CreateArticle.jsx';
import UserProfile from './pages/UserProfile.jsx';
import EditArticle from './pages/article/EditArticle.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-black">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article" element={<Article />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/article/create" element={<CreateArticle />} />
            <Route path="/article/:id/edit" element={<EditArticle />} />
            <Route path="/users/:id" element={<UserProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;