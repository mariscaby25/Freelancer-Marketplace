// Ensures the authenticated user has the 'admin' role.
// Must run AFTER authMiddleware so req.user is populated.
function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  next();
}

module.exports = adminMiddleware;