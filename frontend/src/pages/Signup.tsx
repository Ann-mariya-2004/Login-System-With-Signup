import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '', email: '', address: '', phone: '', photo: '', password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      alert("Signup successful");
      navigate('/login');
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          type={key === 'password' ? 'password' : 'text'}
          name={key}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          onChange={handleChange}
        />
      ))}
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;