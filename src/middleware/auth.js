import jwt from 'jsonwebtoken';
import httpStatus from 'http-status-codes';

const isAuthenticated = (req, res, next) => {
  try {
    let token = '';
    if (req.headers.cookie) {
      const cookies = req.headers.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
      }, {});
      token = cookies['x-auth-token'];
    } else if (req.headers['x-auth-token']) {
      token = req.headers['x-auth-token'];
    }

    if (!token) {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // Matches JWT payload: { userId, email, username }
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};

export { isAuthenticated };