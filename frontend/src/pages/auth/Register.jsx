import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input.jsx';
import Button from '../../components/Button.jsx';
import { showAlert } from '../../components/SweetAlert.jsx';

const API_URL = 'http://localhost:5000/api';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, form);
      await showAlert('Success', 'Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (err) {
      showAlert('Error', err.response?.data?.message || 'Registrasi gagal', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <Button type="submit" className="w-full">Register</Button>
      </form>
    </div>
  );
}

export default Register;