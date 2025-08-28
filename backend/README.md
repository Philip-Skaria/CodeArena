# CodeArena Backend

A clean, organized backend API for the CodeArena competitive programming platform.

## 🏗️ Project Structure

```
backend/
├── config/           # Configuration files
│   └── config.js     # Main configuration
├── controllers/      # Business logic controllers
├── middleware/       # Custom middleware
│   ├── cors.js       # CORS configuration
│   ├── errorHandler.js # Global error handling
│   └── logger.js     # Request logging
├── models/           # Data models (future use)
├── routes/           # API route definitions
│   ├── index.js      # Main route index
│   ├── health.js     # Health check routes
│   └── platforms.js  # Platform-specific routes
├── services/         # External service integrations
│   ├── leetcodeService.js
│   └── codeforcesService.js
├── utils/            # Utility functions
│   └── response.js   # Response helpers
├── server.js         # Main server file
└── package.json      # Dependencies
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
HOST=localhost
NODE_ENV=development
API_BASE_URL=/api
```

### 3. Run the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Basic health status
- `GET /api/health/detailed` - Detailed system info

### Platforms
- `GET /api/platforms` - List available platforms
- `GET /api/platforms/leetcode/:handle` - Get LeetCode user data
- `GET /api/platforms/codeforces/:handle` - Get Codeforces user data
- `GET /api/platforms/aggregate` - Get combined platform data

### Root
- `GET /api/` - API information and available endpoints

## 🔧 Features

- **Clean Architecture**: Separated concerns with dedicated folders
- **Middleware**: Logging, error handling, CORS, rate limiting
- **Configuration**: Centralized config management
- **Error Handling**: Consistent error responses
- **Logging**: Request/response logging with timing
- **Security**: Helmet.js for security headers
- **Rate Limiting**: API rate limiting protection

## 🛠️ Development

### Adding New Routes
1. Create route file in `routes/` folder
2. Add to `routes/index.js`
3. Import in `server.js`

### Adding New Middleware
1. Create middleware file in `middleware/` folder
2. Import and use in `server.js`

### Adding New Services
1. Create service file in `services/` folder
2. Import in route files as needed

## 📊 Monitoring

- **Health Checks**: Built-in health monitoring endpoints
- **Logging**: Request timing and status logging
- **Error Tracking**: Centralized error handling and logging

## 🔒 Security

- **CORS**: Configurable cross-origin settings
- **Helmet**: Security headers
- **Rate Limiting**: API abuse protection
- **Input Validation**: Request validation (future enhancement)

## 🚀 Future Enhancements

- Database integration
- Authentication & authorization
- User management
- Problem tracking
- Achievement system
- Social features 