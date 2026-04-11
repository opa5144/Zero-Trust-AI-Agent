function sanitizeInput(input) {
  return input.replace(/<[^>]*>/g, '');  // Remove HTML tags (basic sanitization)
}

module.exports = { sanitizeInput };