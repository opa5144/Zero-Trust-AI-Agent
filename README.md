# 🛡️ Zero Trust AI Agent

A lightweight security interceptor initially built during a hackathon to stop prompt injections, SSRF attempts, and data leaks before they hit your LLM.
Instead of relying on the model's system prompt to protect itself, this project uses a middleware firewall in front of the API to catch malicious payloads early.

---

## Key Features

- **API Security Interceptor**: Inspects user input before passing it to the model.
- **Vulnerable vs. Protected Toggle**: A quick switch to demonstrate how raw model outputs compare to interceptor-filtered responses.
- **Live Security Telemetry**: Real-time stats showing request counts, threat detection flags, and raw logs.
- **Preset Attack Scenarios**: One-click test cases for common prompt injection tricks (system leaks, key exfiltration, role hijacking).

---

## The Core Concept

In an LLM environment, **neither users nor raw prompts can be trusted**. Language models can be manipulated via adversarial inputs into revealing internal system instructions, secret keys, or executing unauthorized actions.

This platform creates a **controlled sandbox** to compare and demonstrate exploit paths side-by-side:
- **Vulnerable Mode**: Raw model pipeline showing live exploit impact.
- **Protected Mode**: Interceptor-validated pipeline blocking threats before execution.

---

## OWASP GenAI Coverage

Focuses on blocking three common issues from the OWASP GenAI Top 10:

- **LLM01 (Prompt Injection)**: Blocked via pattern detection at the middleware level.
- **LLM02 (Sensitive Information Disclosure)**: Catches prompt exfiltration attempts.
- **LLM06 (Excessive Agency)**: Keeps persona shifts and forced system overrides in check.

---

## Built With

- **Frontend / Framework**: Next.js (App Router), Tailwind CSS
- **Backend / Auth (In Progress)**: Supabase, Clerk

---

## References & Security Resources

- [OWASP Top 10 for GenAI](https://genai.owasp.org)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
  
---

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/opa5144/Zero-Trust-AI-Agent.git
cd Zero-Trust-AI-Agent

# 2. Install dependencies
npm install

# 3. Spin up the dev server
npm run dev
```
