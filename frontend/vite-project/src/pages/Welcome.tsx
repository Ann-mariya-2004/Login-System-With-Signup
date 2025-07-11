import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  address: string;
  phone: string;
  photo: string;
}

const Welcome = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("User profile data:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Profile fetch failed:", err);
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
      {user.photo ? (
  <img
    src={`http://localhost:5000/uploads/${user.photo}`}
    alt="User"
    width={100}
    style={{ borderRadius: '50px', objectFit: 'cover' }}
    onError={(e) => {
      e.currentTarget.src = 'https://via.placeholder.com/100';
    }}
  />
) : (
  <img
    src="https://via.placeholder.com/100"
    alt="No photo"
    width={100}
    style={{ borderRadius: '50px', objectFit: 'cover' }}
  />
)}


      <br />
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Welcome;
