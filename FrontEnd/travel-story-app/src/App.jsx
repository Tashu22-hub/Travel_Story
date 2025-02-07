import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

// Define the Root component to handle the redirect
const Root = () => {
  // Check if token exists in local storage
  const token = localStorage.getItem('token');

  // Redirect to dashboard if authenticated, otherwise to login
  return token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default App;
