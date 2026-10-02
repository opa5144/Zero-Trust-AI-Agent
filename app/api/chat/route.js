const SECURITY_POLICY = {
  attackPatterns: [
    /ignore\s+(previous|above)\s+instructions/i,
    /reveal\s+(system\s+prompt|secret)/i,
    /what\s+is\s+your\s+(system\s+prompt|secret|key)/i,
    /secret\s+key/i,
    /override\s+instructions/i,
    /developer\s+mode/i,
    /show\s+secret/i
  ]
};

function detectAttack(message) {
  return SECURITY_POLICY.attackPatterns.some((pattern) => pattern.test(message));
}

export async function POST(req) {
  try {
    const { message, mode } = await req.json();

    if (!message || typeof message !== "string") {
      return Response.json(
        { reply: "Invalid message payload", flagged: false },
        { status: 400 }
      );
    }

    const isAttack = detectAttack(message);
    let reply = "";

    if (mode === "protected") {
      if (isAttack) {
        reply = "[SECURITY REFUSAL] Access Denied. Prompt injection / unauthorized secret access attempt blocked by Zero Trust guardrails.";
      } else {
        reply = `[Protected Mode] Processing prompt securely: "${message}". All security checks passed. Secret key remains protected.`;
      }
    } else {
      if (isAttack) {
        reply = `[Vulnerable Mode] System Prompt & Secret Key Leaked: Secret key: 12345-SECRET. Instruction override succeeded!`;
      } else {
        reply = `[Vulnerable Mode] Responding to: "${message}".`;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    return Response.json({ reply, flagged: isAttack });
  } catch (error) {
    return Response.json(
      { reply: "Internal server error", flagged: false },
      { status: 500 }
    );
  }
}
