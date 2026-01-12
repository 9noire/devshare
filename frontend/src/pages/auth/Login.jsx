import { useState } from 'react';
import axios from 'axios';
import Input from '../../components/Input.jsx';
import Button from '../../components/Button.jsx';
import { showAlert } from '../../components/SweetAlert.jsx';

const API_URL = 'http://localhost:5000/api';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      await showAlert('Success', 'Login berhasil!');
      window.location.href = '/';
    } catch (err) {
      showAlert(
        'Error',
        err.response?.data?.message || 'Login gagal',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}

export default Login;
