require('dotenv').config();

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    environment: process.env.NODE_ENV || 'development'
  },
  
  // API configuration
  api: {
    version: '1.0.0',
    baseUrl: process.env.API_BASE_URL || '/api',
    timeout: 8000,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  },
  
  // External services
  services: {
    leetcode: {
      baseUrl: 'https://leetcode.com/graphql',
      timeout: 8000
    },
    codeforces: {
      baseUrl: 'https://codeforces.com/api',
      timeout: 8000
    }
  },
  
  // Cache configuration
  cache: {
    ttl: 300, // 5 minutes
    checkPeriod: 600 // 10 minutes
  },
  
  // CORS configuration
  cors: {
    allowedOrigins: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173'
    ]
  }
};

module.exports = config; 