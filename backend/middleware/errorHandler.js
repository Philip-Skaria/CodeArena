const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err.stack);
  
  // Default error
  let statusCode = 500;
  let message = 'Internal Server Error';
  let error = 'server_error';
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    error = 'validation_error';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
    error = 'unauthorized';
  } else if (err.code === 'ENOTFOUND') {
    statusCode = 502;
    message = 'External service unavailable';
    error = 'external_service_error';
  } else if (err.code === 'ETIMEDOUT') {
    statusCode = 504;
    message = 'Request timeout';
    error = 'timeout_error';
  }
  
  // Send error response
  res.status(statusCode).json({
    error,
    message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  });
};

module.exports = errorHandler; 