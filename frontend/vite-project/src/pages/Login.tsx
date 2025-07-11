import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
       window.location.href = "/welcome"; 

    } else {
      alert("Login failed: No token received");
    }
    } catch (err:unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Login error:", err.response?.data || err.message);
        alert("Login Failed: " + (err.response?.data?.message || err.message));
      } else {
        console.error("Unexpected error:", err);
        alert("Unexpected Login Error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <button type="submit">Login</button>
      <p>Don't have an account? <a href="/signup">Signup here</a></p>

    </form>
  );
};

export default Login;