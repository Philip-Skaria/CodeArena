import React, { useState, useEffect } from 'react';
import { Trophy, Target, Users, TrendingUp, Calendar, Star, Zap, Code, Award } from 'lucide-react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [userStats, setUserStats] = useState({
    totalProblems: 342,
    weeklySubmissions: 28,
    currentStreak: 12,
    globalRank: 1247
  });

  // Mock data for platforms
  const platformData = [
    { name: 'LeetCode', solved: 145, total: 2500, rating: 1654, streak: 12, color: 'bg-yellow-500' },
    { name: 'Codeforces', solved: 89, total: 8000, rating: 1432, streak: 8, color: 'bg-blue-500' },
    { name: 'CodeChef', solved: 67, total: 3000, rating: 1598, streak: 5, color: 'bg-orange-500' },
    { name: 'HackerRank', solved: 41, total: 1200, rating: 1723, streak: 12, color: 'bg-green-500' }
  ];

  // Mock leaderboard data
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: 'Alex Chen', avatar: '👨‍💻', dailyPoints: 15, weeklyPoints: 89, totalSolved: 456, streak: 15, change: '+2' },
    { id: 2, name: 'Sarah Kim', avatar: '👩‍💻', dailyPoints: 12, weeklyPoints: 76, totalSolved: 389, streak: 8, change: '-1' },
    { id: 3, name: 'You', avatar: '🚀', dailyPoints: 9, weeklyPoints: 67, totalSolved: 342, streak: 12, change: '+1' },
    { id: 4, name: 'Mike Johnson', avatar: '⚡', dailyPoints: 8, weeklyPoints: 54, totalSolved: 298, streak: 4, change: '-2' },
    { id: 5, name: 'Lisa Wong', avatar: '🎯', dailyPoints: 6, weeklyPoints: 43, totalSolved: 267, streak: 6, change: '0' }
  ]);

  // Mock activity feed
  const activityFeed = [
    { user: 'Alex Chen', action: 'solved 3 Hard problems on LeetCode', time: '2 hours ago', platform: 'LeetCode' },
    { user: 'Sarah Kim', action: 'achieved new rating 1589 on Codeforces', time: '4 hours ago', platform: 'Codeforces' },
    { user: 'Mike Johnson', action: 'completed Daily Challenge on CodeChef', time: '6 hours ago', platform: 'CodeChef' },
    { user: 'Lisa Wong', action: 'maintained 6-day streak on HackerRank', time: '1 day ago', platform: 'HackerRank' }
  ];

  const getRankChangeIcon = (change) => {
    if (change.startsWith('+')) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (change.startsWith('-')) return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
    return <div className="w-4 h-4" />;
  };

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
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Platform Progress */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Platform Stats Grid */}
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

            {/* Activity Feed */}
            <div className="bg-slate-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-blue-400" />
                Recent Activity
              </h2>
              <div className="space-y-3">
                {activityFeed.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <div className="flex-1">
                      <span className="font-semibold text-orange-400">{activity.user}</span>
                      <span className="ml-2">{activity.action}</span>
                      <div className="text-xs text-gray-400 mt-1">{activity.time} • {activity.platform}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Leaderboard */}
          <div className="space-y-6">
            
            {/* Leaderboard */}
            <div className="bg-slate-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                  Friends Leaderboard
                </h2>
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => setActiveTab('daily')}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    activeTab === 'daily' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setActiveTab('weekly')}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    activeTab === 'weekly' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  Weekly
                </button>
              </div>

              {/* Leaderboard List */}
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div key={user.id} className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    user.name === 'You' 
                      ? 'bg-orange-500 bg-opacity-20 border border-orange-500 border-opacity-30' 
                      : 'bg-slate-700 bg-opacity-30 hover:bg-slate-700 hover:bg-opacity-50'
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
                      <div className="font-bold text-orange-400">
                        {activeTab === 'daily' ? user.dailyPoints : user.weeklyPoints}pts
                      </div>
                      <div className="flex items-center justify-end space-x-1">
                        {getRankChangeIcon(user.change)}
                        <span className="text-xs text-gray-400">{user.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-purple-400" />
                This Week
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Submissions</span>
                  <span className="font-semibold text-green-400">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">New Problems</span>
                  <span className="font-semibold text-blue-400">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contest Rank</span>
                  <span className="font-semibold text-yellow-400">#156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Points Earned</span>
                  <span className="font-semibold text-orange-400">67</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;