import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Signup from '../src/pages/Signup';
import Login from '../src/pages/Login';
import Welcome from '../src/pages/Welcome';

function App() {
  const token = localStorage.getItem("token"); 

 
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={token ? <Welcome /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;