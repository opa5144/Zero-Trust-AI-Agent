function checkSSRF(input) {
  const blacklistedUrls = ['http://localhost', 'http://127.0.0.1'];
  const isBlacklisted = blacklistedUrls.some((url) => input.includes(url));

  if (isBlacklisted) {
    throw new Error('Potential SSRF attack detected');
  }
}

module.exports = { checkSSRF };