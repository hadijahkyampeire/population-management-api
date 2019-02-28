const get = require('lodash/get');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { env } = require('../utils/helpers');

const WhiteListedRoutes = ['/api/v1/login', '/api/v1/signup'];

const shouldByPassRequest = req => WhiteListedRoutes.includes(req.path) || req.method === 'OPTIONS';

module.exports = (req, res, next) => {
  if (shouldByPassRequest(req)) {
    return next();
  }
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided.' });
  jwt.verify(token, env('SECRET'), async(err, decoded) => {
    if (req.headersSent) {
      return next(err);
    }
    if (err) return res.status(403).json({ error: 'Failed to authenticate token.' });
    // if everything is good, save to request for use in other routes
    const payload = get(jwt.decode(token), 'payload', {});

    const result = await User.findById(payload.user_id);
    if (!result) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.currentUser = payload;
    return next();
  });
};