import React, { useState, useEffect } from 'react';
import { Trophy, Target, Users, TrendingUp, Calendar, Star, Zap, Code, Award, Loader2 } from 'lucide-react';
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [platformData, setPlatformData] = useState({});
  
  // User handles - you can make these configurable later
  const LEETCODE_HANDLE = 'atomic_rooster';
  const CODEFORCES_HANDLE = 'philipskaria04';

  // Calculate user stats from platform data
  const [userStats, setUserStats] = useState({
    totalProblems: 0,
    weeklySubmissions: 0,
    currentStreak: 0,
    globalRank: 0
  });

  // Fetch platform data from backend
  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, test if backend is reachable
        console.log('Testing backend connectivity...');
        try {
          const healthCheck = await fetch('http://localhost:3000/api/health');
          console.log('Backend health check status:', healthCheck.status);
        } catch (healthErr) {
          console.error('Backend not reachable:', healthErr);
          throw new Error('Backend server is not running. Please start the backend first.');
        }
        
        console.log('Fetching data from:', `http://localhost:3000/api/platforms/aggregate?leetcodeHandle=${LEETCODE_HANDLE}&codeforcesHandle=${CODEFORCES_HANDLE}&recentCount=5`);
        
        const response = await fetch(
          `http://localhost:3000/api/platforms/aggregate?leetcodeHandle=${LEETCODE_HANDLE}&codeforcesHandle=${CODEFORCES_HANDLE}&recentCount=5`
        );
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        setPlatformData(data);
        
        // Update user stats based on real data
        const totalProblems = (data.leetcode?.summary?.totalSolved || 0) + (data.codeforces?.summary?.problemsSolved || 0);
        const totalSubmissions = (data.leetcode?.recentSubmissions?.length || 0) + (data.codeforces?.recentSubmissions?.length || 0);
        
        setUserStats({
          totalProblems,
          weeklySubmissions: totalSubmissions,
          currentStreak: 0, // Will be calculated from submission history later
          globalRank: data.leetcode?.summary?.ranking || 0
        });
        
      } catch (err) {
        console.error('Error fetching platform data:', err);
        setError(`Failed to fetch platform data: ${err.message}. Please check if backend is running.`);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatformData();
  }, []);

  // Refresh data function
  const refreshData = () => {
    window.location.reload();
  };

  // View all submissions function
  const viewAllSubmissions = () => {
    const allSubmissions = [];
    
    if (platformData.leetcode?.recentSubmissions) {
      platformData.leetcode.recentSubmissions.forEach(sub => {
        allSubmissions.push({
          platform: 'LeetCode',
          title: sub.title,
          status: sub.status,
          language: sub.lang,
          time: new Date(sub.timestamp * 1000).toLocaleString(),
          handle: LEETCODE_HANDLE
        });
      });
    }
    
    if (platformData.codeforces?.recentSubmissions) {
      platformData.codeforces.recentSubmissions.forEach(sub => {
        allSubmissions.push({
          platform: 'Codeforces',
          title: sub.problem,
          status: sub.verdict,
          language: sub.language,
          time: new Date(sub.timeSeconds * 1000).toLocaleString(),
          handle: CODEFORCES_HANDLE
        });
      });
    }
    
    // Sort by time (newest first)
    allSubmissions.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    // Create a formatted display
    const submissionsText = allSubmissions.map(sub => 
      `${sub.platform}: ${sub.title} - ${sub.status} (${sub.language}) - ${sub.time}`
    ).join('\n');
    
    alert(`All Submissions:\n\n${submissionsText}`);
  };

  // Add platform function
  const addPlatform = () => {
    const platform = prompt('Enter platform name (e.g., CodeChef, HackerRank):');
    if (platform) {
      const handle = prompt(`Enter your ${platform} handle/username:`);
      if (handle) {
        alert(`Platform ${platform} with handle ${handle} added! (This is a demo - backend integration needed)`);
        // TODO: In the future, this would call your backend to add a new platform
      }
    }
  };

  // Get platform display data
  const getPlatformDisplayData = () => {
    const platforms = [];
    
    // LeetCode
    if (platformData.leetcode && !platformData.leetcode.error) {
      platforms.push({
        name: 'LeetCode',
        solved: platformData.leetcode.summary?.totalSolved || 0,
        total: 2500, // LeetCode total problems
        rating: platformData.leetcode.summary?.ranking || 'N/A',
        streak: 0, // Will be calculated from submission history later
        color: 'bg-yellow-500',
        handle: LEETCODE_HANDLE,
        recentSubmissions: platformData.leetcode.recentSubmissions || []
      });
    }
    
    // Codeforces
    if (platformData.codeforces && !platformData.codeforces.error) {
      platforms.push({
        name: 'Codeforces',
        solved: platformData.codeforces.summary?.problemsSolved || 0,
        total: 8000, // Approximate total
        rating: platformData.codeforces.summary?.rating || 'N/A',
        streak: 0, // Will be calculated from submission history later
        color: 'bg-blue-500',
        handle: CODEFORCES_HANDLE,
        recentSubmissions: platformData.codeforces.recentSubmissions || []
      });
    }
    
    return platforms;
  };

  // Get recent activity from real submissions
  const getRecentActivity = () => {
    const activities = [];
    
    // Add LeetCode submissions
    if (platformData.leetcode?.recentSubmissions) {
      platformData.leetcode.recentSubmissions.forEach(sub => {
        activities.push({
          user: LEETCODE_HANDLE,
          action: `${sub.status} ${sub.title} on LeetCode`,
          time: new Date(sub.timestamp * 1000).toLocaleDateString(),
          platform: 'LeetCode',
          status: sub.status
        });
      });
    }
    
    // Add Codeforces submissions
    if (platformData.codeforces?.recentSubmissions) {
      platformData.codeforces.recentSubmissions.forEach(sub => {
        activities.push({
          user: CODEFORCES_HANDLE,
          action: `${sub.verdict} ${sub.problem} on Codeforces`,
          time: new Date(sub.timeSeconds * 1000).toLocaleDateString(),
          platform: 'Codeforces',
          status: sub.verdict
        });
      });
    }
    
    // Sort by time and take first 5
    return activities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 5);
  };

  const getStatusColor = (status) => {
    if (status === 'Accepted' || status === 'OK') return 'text-green-400';
    if (status === 'Wrong Answer' || status === 'WRONG_ANSWER') return 'text-red-400';
    if (status === 'Time Limit Exceeded' || status === 'TIME_LIMIT_EXCEEDED') return 'text-yellow-400';
    return 'text-gray-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-orange-400" />
          <p className="text-xl">Loading your coding stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg p-6 max-w-md">
            <p className="text-xl text-red-400 mb-4">Failed to load data</p>
            <p className="text-gray-300 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const platforms = getPlatformDisplayData();
  const recentActivity = getRecentActivity();

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-slate-900 bg-opacity-50 backdrop-blur-sm border-b border-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-white">CodeArena</h1>
              <div className="flex items-center space-x-2 text-orange-400">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Total Problems: {userStats.totalProblems}</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{userStats.totalProblems}</div>
                <div className="text-sm text-gray-400">Total Solved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{userStats.weeklySubmissions}</div>
                <div className="text-sm text-gray-400">Recent Submissions</div>
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
              {platforms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platforms.map((platform, index) => (
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
                            <span className="text-gray-400">Handle: </span>
                            <span className="font-semibold text-orange-400">{platform.handle}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>No platform data available</p>
                </div>
              )}
            </div>

            {/* Recent Submissions */}
            <div className="bg-slate-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Code className="w-6 h-6 mr-2 text-green-400" />
                Recent Submissions
              </h2>
              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700 bg-opacity-30 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${activity.status === 'Accepted' || activity.status === 'OK' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <div className="flex-1">
                        <span className="font-semibold text-orange-400">{activity.user}</span>
                        <span className={`ml-2 ${getStatusColor(activity.status)}`}>{activity.action}</span>
                        <div className="text-xs text-gray-400 mt-1">{activity.time} • {activity.platform}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>No recent submissions found</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Stats & Info */}
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
                {userStats.totalProblems > 0 ? (
                  // Show user's own stats if they have data
                  <div className="flex items-center space-x-3 p-3 rounded-lg transition-all bg-orange-500 bg-opacity-20 border border-orange-500 border-opacity-30">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold bg-orange-600">
                        1
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-semibold">You</div>
                        <div className="text-xs text-gray-400">
                          {activeTab === 'daily' 
                            ? `${Math.floor(userStats.weeklySubmissions / 7)} daily avg • ${userStats.totalProblems} total solved`
                            : `${userStats.weeklySubmissions} this week • ${userStats.totalProblems} total solved`
                          }
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-orange-400">
                        {activeTab === 'daily' ? Math.floor(userStats.weeklySubmissions / 7) : userStats.weeklySubmissions}pts
                      </div>
                      <div className="flex items-center justify-end space-x-1">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-gray-400">
                          +{activeTab === 'daily' ? Math.floor(userStats.weeklySubmissions / 7) : userStats.weeklySubmissions}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Show empty state if no data
                  <div className="text-center py-8 text-gray-400">
                    <p>Complete problems to appear on the leaderboard!</p>
                  </div>
                )}
                
                {/* Placeholder for future friends/other users */}
                <div className="text-center py-4 text-gray-500 text-sm">
                  <p>More users will appear here as they join</p>
                </div>
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
                  <span className="font-semibold text-green-400">{userStats.weeklySubmissions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">New Problems</span>
                  <span className="font-semibold text-blue-400">{Math.floor(userStats.totalProblems * 0.1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contest Rank</span>
                  <span className="font-semibold text-yellow-400">#{userStats.globalRank || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Points Earned</span>
                  <span className="font-semibold text-orange-400">{userStats.weeklySubmissions * 2}</span>
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