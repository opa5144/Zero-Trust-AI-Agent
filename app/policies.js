function checkUserRole(user, role) {
  return user.roles.includes(role);
}

module.exports = { checkUserRole };