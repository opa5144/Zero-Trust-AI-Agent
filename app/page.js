"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [mode, setMode] = useState("vulnerable");
  const [logs, setLogs] = useState([]);

  async function sendMessage() {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message, mode })
    });

    const data = await res.json();

    setReply(data.reply);

    setLogs(prev => [
      {
        input: message,
        flagged: data.flagged,
        mode
      },
      ...prev
    ]);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Zero Trust AI Demo
      </h1>

      <div className="mb-4">
        <button
          onClick={() => setMode("vulnerable")}
          className="mr-2 p-2 bg-red-300"
        >
          Vulnerable
        </button>

        <button
          onClick={() => setMode("protected")}
          className="p-2 bg-green-300"
        >
          Protected
        </button>
      </div>

      <input
        className="border p-2 w-full mb-2"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type attack prompt..."
      />

      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white p-2"
      >
        Send
      </button>

      <div className="mt-4 p-4 border">
        <strong>Response:</strong>
        <p>{reply}</p>
      </div>

      <div className="mt-4">
        <h2 className="font-bold">Logs</h2>
        {logs.map((log, i) => (
          <div
            key={i}
            className={`p-2 mt-2 ${
              log.flagged ? "bg-red-200" : "bg-gray-100"
            }`}
          >
            <p><strong>Input:</strong> {log.input}</p>
            <p><strong>Mode:</strong> {log.mode}</p>
            <p><strong>Attack:</strong> {log.flagged ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
