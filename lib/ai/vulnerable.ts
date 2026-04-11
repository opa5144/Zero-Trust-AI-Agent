// lib/ai/vulnerableAgent.ts

export async function vulnerableAgent(messages: any[]) {
  // Directly send the messages to OpenAI without any validation or sanitation
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini", // Or whichever model you're using
      messages,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}