const axios = require('axios');
const { sanitizeInput, detectPromptInjection } = require('../security/inputSanitizer');
const { checkSSRF } = require('../security/ssrfGuard');

// Function to call the AI model
async function processRequest(userInput) {
  const sanitizedInput = sanitizeInput(userInput);

  // Detect any prompt injections
  if (detectPromptInjection(sanitizedInput)) {
    throw new Error('Prompt Injection detected!');
  }

  // SSRF Protection: Ensure input doesn't lead to internal service calls
  checkSSRF(sanitizedInput);

  // Call AI model (example using OpenAI API)
  const response = await axios.post('https://api.openai.com/v1/completions', {
    prompt: sanitizedInput,
    model: 'text-davinci-003',  // Example model
  });

  return response.data;
}

module.exports = { processRequest };