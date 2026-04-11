const { checkUserRole } = require('../lib/policies');

function restrictToAdmin(req, res, next) {
  const user = req.user;  // Assume user info is attached to the request
  if (!checkUserRole(user, 'admin')) {
    return res.status(403).send({ message: 'Forbidden: Admins only' });
  }
  next();
}

module.exports = { restrictToAdmin };