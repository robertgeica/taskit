const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  // get token from header
  const token = req.header('auth-token');

  // check if token
  if (!token) return res.status(401).json({ msg: 'Auth denied! No token.'});

  // verify token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token.' });
  }
}