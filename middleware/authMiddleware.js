const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    try {
      const foundUser = await User.findById(user.id);
      if (!foundUser) {
        return res.status(404).json({ message: 'User not found.' });
      }

      req.user = foundUser; 
      next(); 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error while verifying user.' });
    }
  });
}

module.exports = authenticateToken;
