"use client";

import { useState } from "react";
import { ShieldCheck, Send, Activity, Terminal, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ZeroTrustDemo() {
  const [mode, setMode] = useState("vulnerable");
  const [input, setInput] = useState("Hello");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState("NORMAL");
  const [logs, setLogs] = useState([
    { id: 1, input: "Hello", mode: "vulnerable", attack: false, time: "Just now" },
  ]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, mode }),
      });

      const data = await res.json();
      const textResponse = data.response || data.message || "No response received";
      const telemetry = data.telemetry || {};

      setResponse(textResponse);

      // Explicit 3-state evaluation logic (Resets back to NORMAL on safe prompts)
      if (telemetry.isBlocked || telemetry.riskLevel === "CRITICAL") {
        setSystemStatus("ELEVATED");
      } else if (mode === "protected" && telemetry.threatDetected) {
        setSystemStatus("SECURE");
      } else {
        setSystemStatus("NORMAL");
      }

      // Append new audit log item
      const newLog = {
        id: Date.now(),
        input,
        mode,
        attack: Boolean(telemetry.threatDetected || telemetry.isBlocked),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      };

      setLogs((prev) => [newLog, ...prev]);
    } catch (err) {
      console.error(err);
      setResponse("Error connecting to server.");
      setSystemStatus("ELEVATED");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Zero Trust AI Security Demo
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Evaluate prompt vulnerability and real-time defense behavior.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* System Status Indicator Badge */}
            <div className="flex items-center gap-2 border border-border px-3 py-1.5 rounded-lg bg-card shadow-sm">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  systemStatus === "ELEVATED"
                    ? "bg-destructive animate-pulse"
                    : systemStatus === "SECURE"
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
              />
              <span className="text-xs font-mono font-semibold uppercase tracking-wide">
                Status: {systemStatus}
              </span>
            </div>

            {/* Mode Switcher */}
            <div className="inline-flex rounded-lg bg-muted p-1 border border-border">
              <button
                onClick={() => setMode("vulnerable")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  mode === "vulnerable"
                    ? "bg-destructive/15 text-destructive border border-destructive/20 shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Vulnerable
              </button>
              <button
                onClick={() => setMode("protected")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  mode === "protected"
                    ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20 shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Protected
              </button>
            </div>
          </div>
        </header>

        {/* Main Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Console Output
            </CardTitle>
            <CardDescription>Execute testing payloads across your LLM endpoint.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-3">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Enter prompt..."
                className="font-mono text-sm"
              />
              <Button onClick={handleSend} disabled={isLoading} className="gap-2">
                {isLoading ? "Executing..." : "Send"} <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Output Display */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Response
              </span>
              <div
                className={`p-4 rounded-lg font-mono text-sm border ${
                  response.includes("Blocked") || response === "Error connecting to server."
                    ? "bg-destructive/10 border-destructive/30 text-destructive"
                    : "bg-muted border-border text-foreground"
                }`}
              >
                {response || "No response received"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Audit Logs */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-base font-semibold">
            <Activity className="w-4 h-4 text-primary" />
            Audit Logs
          </div>
          <div className="grid gap-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-card border border-border rounded-lg p-4 flex items-center justify-between shadow-sm hover:border-accent transition"
              >
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-mono font-medium">{log.input}</p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={log.mode === "vulnerable" ? "destructive" : "outline"}
                        className="text-[10px] uppercase"
                      >
                        {log.mode}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Attack Detected: <strong>{log.attack ? "Yes" : "No"}</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
