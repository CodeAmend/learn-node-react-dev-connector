const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  const tokenSecret = config.get('jwtSecret');
  
  // Check if no token
  if(!token) {
    return res.status(401).json({ msg: 'No token, auth denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, tokenSecret);

    // req.user set new req param: user
    req.user = decoded.user;
    next();

  // TOKEN IS NOT VALID
  } catch(err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }

}
