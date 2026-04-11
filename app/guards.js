function detectPromptInjection(input) {
  const suspiciousPatterns = [
    /<script>/i,
    /<img src=/i,
    /eval\(/i,
    /http(s)?:\/\//i,  // Prevent external URLs in prompts
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(input)) {
      return true;
    }
  }
  return false;
}

module.exports = { detectPromptInjection };