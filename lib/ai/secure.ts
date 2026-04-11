// lib/ai/secureAgent.ts

const sanitizeInput = (input: string) => {
  // Basic sanitization: Remove dangerous or malicious content like <script> tags
  const sanitizedInput = input.replace(/<script.*?>.*?<\/script>/g, "").replace(/SELECT\s.*?FROM/g, "");

  // Additional sanitization could be added here (e.g., limiting special characters)
  return sanitizedInput;
};

export async function secureAgent(messages: any[]) {
  // Sanitize the input message before sending it to the AI model
  const sanitizedMessages = messages.map((message) => ({
    ...message,
    content: sanitizeInput(message.content),
  }));

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini", // Or whichever model you're using
      messages: sanitizedMessages,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}