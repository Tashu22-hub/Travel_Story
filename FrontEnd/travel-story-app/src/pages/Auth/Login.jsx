import React from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Form submitted');
  };

  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className="container h-screen flex justify-center items-center px-20 mx-auto">
        {/* Left Side: Background Image and Text */}
        <div className="w-2/4 h-[90vh] flex items-end bg-login-bg-img bg-cover bg-center rounded-lg shadow-lg p-10 z-50 relative">
          <div className="absolute top-10 left-10 text-white">
            <h4 className='text-4xl font-bold mb-4'>Capture Your <br />Journeys</h4>
            <p className='text-[15px] text-white leading-6 pr-6 mt-4'>
            <br/>
              Record your travel experiences and memories in your personal travel journal. Share your travel stories with the world.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-2/4 p-10 bg-white rounded-lg shadow-lg z-50">
          <form onSubmit={handleSubmit}>
            <h4 className='text-2xl font-semibold mb-7'>Login</h4>

            <input
              type="text"
              placeholder="Email"
              className='w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500'
            /><br />
            <PasswordInput /><br />
            <br />
            <button
              type="submit"
              className='btn-primary'
            >
              Login
            </button>

            <p className="text sm text-gray-500 text-center my-4">Or</p>

            <button
              type="button"
              className='btn-light btn-primary '
              onClick={() => navigate('/signup')}
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};


export default Login;