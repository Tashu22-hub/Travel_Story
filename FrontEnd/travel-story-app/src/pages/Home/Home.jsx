import React, { useEffect, useState } from 'react'; // Added useEffect and useState
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom'; // Corrected the useNavigate import
import axios from 'axios'; // Ensure axiosInstance is defined or imported

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserinfo] = useState(null);
  const [error, setError] = useState(null); // Added error state

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axios.get("/get-user"); // Ensure this matches your backend endpoint setup
      if (response.data && response.data.user) {
        // Set user info in state
        setUserinfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Clear storage if unauthorized
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        setError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
    </>
  );
};

export default Home;
