import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom' 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate=useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
    // Add your login logic here
    navigate('/home')
  };

  const handleRegister = () => {
    // Add navigation to register page
    navigate('/signup');
  };

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password page');
    // Add navigation to forgot password page
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-2xl font-semibold text-white">CodeArena</h1>
      </div>

      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large orange shape */}
        <div 
          className="absolute opacity-90 animate-pulse"
          style={{
            width: '600px',
            height: '200px',
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
            borderRadius: '20px',
            top: '15%',
            left: '5%',
            transform: 'rotate(-15deg) skewX(-10deg)',
            animation: 'float1 6s ease-in-out infinite'
          }}
        />
        
        {/* Medium yellow-orange shape */}
        <div 
          className="absolute opacity-90"
          style={{
            width: '400px',
            height: '150px',
            background: 'linear-gradient(135deg, #f7931e, #ffd23f)',
            borderRadius: '15px',
            top: '35%',
            right: '10%',
            transform: 'rotate(20deg) skewX(5deg)',
            animation: 'float2 8s ease-in-out infinite'
          }}
        />
        
        {/* Large circular shape */}
        <div 
          className="absolute opacity-80"
          style={{
            width: '300px',
            height: '300px',
            background: 'linear-gradient(135deg, #ff8c42, #ff6b35)',
            borderRadius: '50%',
            bottom: '10%',
            left: '20%',
            animation: 'float3 7s ease-in-out infinite'
          }}
        />
        
        {/* Additional geometric elements */}
        <div 
          className="absolute opacity-70"
          style={{
            width: '250px',
            height: '80px',
            background: 'linear-gradient(135deg, #ffd23f, #ff8c42)',
            borderRadius: '10px',
            top: '55%',
            right: '25%',
            transform: 'rotate(45deg)',
            animation: 'float4 5s ease-in-out infinite'
          }}
        />

        {/* Scattered dots for detail
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-orange-300 rounded-full opacity-60 animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-300 rounded-full opacity-80" />
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-orange-400 rounded-full opacity-50" />
        <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-yellow-400 rounded-full opacity-70 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-orange-300 rounded-full opacity-60" />
        <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-yellow-200 rounded-full opacity-50" /> */}
      </div>

      {/* Login Form */}
      <div className="relative z-10 bg-gray-400 bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md mx-4">
        {/* Form Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-2">Login to your account</h2>
          <p className="text-sm text-gray-700">Compete with your friends on popular coding platforms</p>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-600 text-white placeholder-gray-300 rounded-full border-none outline-none focus:bg-gray-500 transition-colors"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-600 text-white placeholder-gray-300 rounded-full border-none outline-none focus:bg-gray-500 transition-colors"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full transition-colors duration-200 transform hover:scale-105"
          >
            Login
          </button>
        </div>

        {/* Footer Links */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <button
            onClick={handleRegister}
            className="text-gray-700 hover:text-gray-900 underline transition-colors cursor-pointer"
          >
            Register
          </button>
          <button
            onClick={handleForgotPassword}
            className="text-gray-700 hover:text-gray-900 underline transition-colors cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Custom CSS for animations */}
      {/* <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float1 {
            0%, 100% { 
              transform: rotate(-15deg) skewX(-10deg) translateY(0px); 
            }
            50% { 
              transform: rotate(-15deg) skewX(-10deg) translateY(-15px); 
            }
          }
          
          @keyframes float2 {
            0%, 100% { 
              transform: rotate(20deg) skewX(5deg) translateY(0px); 
            }
            50% { 
              transform: rotate(20deg) skewX(5deg) translateY(20px); 
            }
          }
          
          @keyframes float3 {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
            }
            50% { 
              transform: translateY(-25px) scale(1.05); 
            }
          }
          
          @keyframes float4 {
            0%, 100% { 
              transform: rotate(45deg) translateY(0px); 
            }
            50% { 
              transform: rotate(45deg) translateY(-20px); 
            }
          }
        `
      }} /> */}
    </div>
  );
};

export default Login;