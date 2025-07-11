import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setUser(res.data);
      } catch (err) {
        alert("Failed to load profile");
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  return user ? (
    <div>
      <h2>Welcome {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
      <p>Phone: {user.phone}</p>
      <img src={user.photo} alt="User" width={100} />
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  ) : <p>Loading...</p>;
};

export default Welcome;