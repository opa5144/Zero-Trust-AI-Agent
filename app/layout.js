import "./globals.css";

export const metadata = {
  title: "Zero Trust AI Guard",
  description: "Real-time LLM Prompt Security Interceptor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
