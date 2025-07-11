import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
  name: '',
  email: '', 
  address: '', 
  phone: '', 
  password: ''
});


  const [photo, setPhoto] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (photo) {
      formData.append('photo', photo);
    }

    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData,{
        headers: {
          'Content-Type':'multipart/form-data',
        }
      });
      alert("Signup successful");
      navigate('/login');
    } catch (err: unknown ) {
       if (axios.isAxiosError(err)) {
       console.error("Signup error:", err.response?.data || err.message);
      alert("Signup failed: "+ (err.response?.data?.message || err.message));
    } else {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Signup</h2>
      {Object.keys(form).map((key) => (
         key !== 'photo' && (
        <input
         key={key}
         type={key === 'password' ? 'password' : 'text'}
         name={key}
         placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          onChange={handleChange} />
         )
      ))}
       
        <label>
          Upload Photo:
           <input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} />
        </label>


      <button type="submit">Signup</button>
      <p>Already have an account? <a href="/login">Login here</a></p>

    </form>
  );
};

export default Signup;