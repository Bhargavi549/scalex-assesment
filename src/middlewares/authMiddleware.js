
function isAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);
    
    if (decoded.userType === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Only admin users are allowed to access this endpoint' });
    }
  }
  
  module.exports = {
    isAdmin,
  };
  