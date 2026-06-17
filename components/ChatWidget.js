"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatWidget({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Verve's AI. Try sending me a message here, and then texting the phone number to see me remember this conversation." }
  ]);
  const [input, setInput] = useState("");
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Connect WebSocket when opened
  useEffect(() => {
    if (isOpen && !ws.current) {
      ws.current = new WebSocket("ws://localhost:8000/ws/webchat");
      
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      ws.current.onclose = () => {
        ws.current = null;
      };
    }

    return () => {
      // Don't close immediately on unmount so they don't lose connection just hiding it
    };
  }, [isOpen]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !ws.current) return;

    // Add user message to UI
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    // Send to backend via WebSocket
    ws.current.send(JSON.stringify({
      session_id: "demo_web_user",
      message: input
    }));

    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[350px] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-soft)] shadow-2xl flex flex-col h-[500px]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-surface)] p-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-blink rounded-full bg-[var(--color-accent)]" />
          <span className="font-display text-sm font-semibold text-[var(--color-ink)]">Verve Agent</span>
        </div>
        <button onClick={onClose} className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
              msg.role === "user" 
                ? "bg-[var(--color-accent)] text-[#0b0b0f] rounded-br-none" 
                : "bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-line)] rounded-bl-none"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={sendMessage} className="border-t border-[var(--color-line)] p-4 bg-[var(--color-surface)]">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full rounded-full border border-[var(--color-line)] bg-[var(--color-bg)] py-2 pl-4 pr-10 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[var(--color-accent)] hover:bg-[var(--color-line)]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>

    </div>
  );
}
