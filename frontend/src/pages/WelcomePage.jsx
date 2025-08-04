import React from 'react';
import { Trophy, ArrowRight, Shield, Globe, Zap } from 'lucide-react';
import {useNavigate} from 'react-router-dom'

const WelcomePage = () => {
    const navigate=useNavigate();

    const onLoginClick=()=>{
        navigate('/login');
    }

    const onSignupClick=()=>{
        navigate('/signup')
    }
  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-900 flex items-center justify-center relative overflow-hidden">
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

export default WelcomePage;