import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ProfileStats from "./components/Cards/ProfileStats";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile-stats" element={<ProfileStats />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>

      {/* ✅ Place ToastContainer here globally */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

const Root = () => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default App;
