import React, { useState, useEffect } from 'react';
import { Trophy, Target, Users, TrendingUp, Calendar, Star, Zap, Code, Award, ArrowRight, Shield, Globe } from 'lucide-react';

// Welcome Screen Component
const Home = ({ onLoginClick, onSignupClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center relative overflow-hidden">
      {/* Background Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-96 h-60 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl transform -rotate-12 opacity-90"></div>
        <div className="absolute bottom-20 left-12 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80"></div>
        <div className="absolute top-32 right-16 w-80 h-48 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-3xl transform rotate-25 opacity-70"></div>
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-orange-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-orange-300 rounded-full opacity-40"></div>
      </div>

      {/* Welcome Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
            Code<span className="text-orange-400">Arena</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Battle Code. Prove Skills. Win Glory.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Track your progress across all major coding platforms, compete with friends, 
            and climb the leaderboards in the ultimate coding competition hub.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-6">
            <Globe className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Multi-Platform Tracking</h3>
            <p className="text-gray-400">Connect LeetCode, Codeforces, CodeChef, and more</p>
          </div>
          <div className="bg-slate-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-6">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Leaderboards</h3>
            <p className="text-gray-400">Compete with friends and track daily progress</p>
          </div>
          <div className="bg-slate-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-6">
            <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Streak Tracking</h3>
            <p className="text-gray-400">Maintain consistency and build coding habits</p>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
          <button
            onClick={onLoginClick}
            className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 px-8 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Shield className="w-5 h-5" />
            <span>Login to Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onSignupClick}
            className="w-full md:w-auto bg-transparent border-2 border-orange-400 text-orange-400 font-semibold py-4 px-8 rounded-full hover:bg-orange-400 hover:text-white transition-all duration-200 transform hover:scale-105"
          >
            Create Account
          </button>
        </div>

        <p className="text-gray-500 mt-8 text-sm">
          Join thousands of developers already competing on CodeArena
        </p>
      </div>
    </div>
  );
};

// Login Screen Component
const LoginScreen = ({ onLoginSuccess, onBackToWelcome, onSignupClick }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // Demo credentials for testing
      if (formData.email === 'demo@codearena.com' && formData.password === 'demo123') {
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Try demo@codearena.com / demo123');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center relative overflow-hidden">
      {/* Background Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-96 h-60 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl transform -rotate-12 opacity-90"></div>
        <div className="absolute bottom-20 left-12 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80"></div>
        <div className="absolute top-32 right-16 w-80 h-48 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-3xl transform rotate-25 opacity-70"></div>
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-orange-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-orange-300 rounded-full opacity-40"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBackToWelcome}
        className="absolute top-8 left-8 z-20 text-white hover:text-orange-400 transition-colors"
      >
        ← Back to Welcome
      </button>

      {/* CodeArena Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-white text-3xl font-bold">CodeArena</h1>
      </div>

      {/* Login Form */}
      <div className="relative z-10 bg-gray-400 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Login to your account</h2>
          <p className="text-gray-600">Compete with your friends on LeetCode</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
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

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 px-6 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div className="flex justify-between items-center mt-6 text-sm">
          <button 
            onClick={onSignupClick}
            className="text-gray-700 hover:text-gray-900 underline transition-colors"
          >
            Create Account
          </button>
          <button className="text-gray-700 hover:text-gray-900 underline transition-colors">
            Forgot Password?
          </button>
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <strong>Demo:</strong> demo@codearena.com / demo123
        </div>
      </div>
    </div>
  );
};

// Signup Screen Component
const SignupScreen = ({ onSignupSuccess, onBackToWelcome, onLoginClick }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, any valid signup redirects to login
      if (formData.email && formData.password && formData.username) {
        alert('Account created successfully! Please login.');
        onLoginClick();
      } else {
        setError('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center relative overflow-hidden">
      {/* Background Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-96 h-60 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl transform -rotate-12 opacity-90"></div>
        <div className="absolute bottom-20 left-12 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80"></div>
        <div className="absolute top-32 right-16 w-80 h-48 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-3xl transform rotate-25 opacity-70"></div>
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-orange-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-orange-300 rounded-full opacity-40"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBackToWelcome}
        className="absolute top-8 left-8 z-20 text-white hover:text-orange-400 transition-colors"
      >
        ← Back to Welcome
      </button>

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

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

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
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 px-6 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </div>

        <div className="flex justify-between items-center mt-6 text-sm">
          <button 
            onClick={onLoginClick}
            className="text-gray-700 hover:text-gray-900 underline transition-colors"
          >
            Already have an account?
          </button>
          <button className="text-gray-700 hover:text-gray-900 underline transition-colors">
            Need Help?
          </button>
        </div>
      </div>
    </div>
  );
};

// Homepage Component
const Homepage = ({ onLogout }) => {
  const [userStats] = useState({
    totalProblems: 342,
    weeklySubmissions: 28,
    currentStreak: 12,
    globalRank: 1247
  });

  const platformData = [
    { name: 'LeetCode', solved: 145, total: 2500, rating: 1654, streak: 12, color: 'bg-yellow-500' },
    { name: 'Codeforces', solved: 89, total: 8000, rating: 1432, streak: 8, color: 'bg-blue-500' },
    { name: 'CodeChef', solved: 67, total: 3000, rating: 1598, streak: 5, color: 'bg-orange-500' },
    { name: 'HackerRank', solved: 41, total: 1200, rating: 1723, streak: 12, color: 'bg-green-500' }
  ];

  const leaderboard = [
    { id: 1, name: 'Alex Chen', avatar: '👨‍💻', dailyPoints: 15, totalSolved: 456, streak: 15, change: '+2' },
    { id: 2, name: 'Sarah Kim', avatar: '👩‍💻', dailyPoints: 12, totalSolved: 389, streak: 8, change: '-1' },
    { id: 3, name: 'You', avatar: '🚀', dailyPoints: 9, totalSolved: 342, streak: 12, change: '+1' },
    { id: 4, name: 'Mike Johnson', avatar: '⚡', dailyPoints: 8, totalSolved: 298, streak: 4, change: '-2' },
    { id: 5, name: 'Lisa Wong', avatar: '🎯', dailyPoints: 6, totalSolved: 267, streak: 6, change: '0' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-700 text-white">
      {/* Header */}
      <header className="bg-slate-900 bg-opacity-50 backdrop-blur-sm border-b border-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-white">CodeArena</h1>
              <div className="flex items-center space-x-2 text-orange-400">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Streak: {userStats.currentStreak} days</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{userStats.totalProblems}</div>
                <div className="text-sm text-gray-400">Total Solved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">#{userStats.globalRank}</div>
                <div className="text-sm text-gray-400">Global Rank</div>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Platform Progress */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2 text-orange-400" />
                Platform Progress
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platformData.map((platform, index) => (
                  <div key={index} className="bg-slate-700 bg-opacity-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{platform.name}</h3>
                      <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Problems Solved</span>
                        <span className="font-semibold">{platform.solved}/{platform.total}</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${platform.color}`}
                          style={{ width: `${(platform.solved / platform.total) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm mt-3">
                        <div>
                          <span className="text-gray-400">Rating: </span>
                          <span className="font-semibold text-yellow-400">{platform.rating}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Streak: </span>
                          <span className="font-semibold text-orange-400">{platform.streak}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <div className="bg-slate-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                Friends Leaderboard
              </h2>
              
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div key={user.id} className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    user.name === 'You' 
                      ? 'bg-orange-500 bg-opacity-20 border border-orange-500 border-opacity-30' 
                      : 'bg-slate-700 bg-opacity-30'
                  }`}>
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-orange-600' : 'bg-slate-600'
                      }`}>
                        {index < 3 ? index + 1 : user.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-gray-400">
                          {user.totalSolved} solved • {user.streak} day streak
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-orange-400">{user.dailyPoints}pts</div>
                      <div className="text-xs text-gray-400">{user.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome', 'login', 'signup', 'homepage'

  const handleLoginSuccess = () => {
    setCurrentScreen('homepage');
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div>
      {currentScreen === 'welcome' && (
        <Home 
          onLoginClick={() => setCurrentScreen('login')}
          onSignupClick={() => setCurrentScreen('signup')}
        />
      )}
      
      {currentScreen === 'login' && (
        <LoginScreen 
          onLoginSuccess={handleLoginSuccess}
          onBackToWelcome={() => setCurrentScreen('welcome')}
          onSignupClick={() => setCurrentScreen('signup')}
        />
      )}
      
      {currentScreen === 'signup' && (
        <SignupScreen 
          onSignupSuccess={() => setCurrentScreen('login')}
          onBackToWelcome={() => setCurrentScreen('welcome')}
          onLoginClick={() => setCurrentScreen('login')}
        />
      )}
      
      {currentScreen === 'homepage' && (
        <Homepage onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Home;