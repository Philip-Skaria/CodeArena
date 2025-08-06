import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Signup data:', formData);
    // Handle signup logic here
    navigate('/home');
  };

  const handleAlreadyHaveAnAccount=()=>{
    console.log('navigate to login page');
    navigate('/login')
  }
  const handleNeedHelp=()=>{
    console.log('navigate to need help page');
    navigate('/needhelp');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-96 h-60 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl transform -rotate-12 opacity-90"></div>
        <div className="absolute bottom-20 left-12 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80"></div>
        <div className="absolute top-32 right-16 w-80 h-48 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-3xl transform rotate-25 opacity-70"></div>

        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-orange-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-orange-300 rounded-full opacity-40"></div>
      </div>

      {/* CodeArena Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-white text-3xl font-bold">CodeArena</h1>
      </div>

      {/* Signup Form */}
      <div className="relative z-10 bg-gray-400 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Create your account</h2>
          <p className="text-gray-600">Join CodeArena and start competing</p>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-600 bg-opacity-70 text-white placeholder-gray-300 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-600 bg-opacity-70 text-white placeholder-gray-300 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-600 bg-opacity-70 text-white placeholder-gray-300 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-600 bg-opacity-70 text-white placeholder-gray-300 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 px-6 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-400"
          >
            Sign Up
          </button>
        </div>

        <div className="flex justify-between items-center mt-6 text-sm">
          <button
            onClick={handleAlreadyHaveAnAccount}
            className="text-gray-700 hover:text-gray-900 transition-colors">
              Already have an account?
          </button>
          <button
            onClick={handleNeedHelp}
            className="text-gray-700 hover:text-gray-900 transition-colors">
              Need help?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;