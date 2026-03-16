"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Bot, Minimize2 } from "lucide-react";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hi! 👋 I'm Anubhav's AI assistant. Ask me anything about his skills, projects, experience, or availability!",
};

const SUGGESTED_QUESTIONS = [
  "What's his tech stack?",
  "Tell me about his projects",
  "Is he available for work?",
  "What are his achievements?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || isLoading) return;

    setInput("");
    setShowSuggestions(false);

    const userMessage = { role: "user", content: userText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Filter out the initial assistant greeting before sending to API
      // Only send messages that came from actual conversation
      const apiMessages = updatedMessages.filter((m, index) => {
        // Skip the very first message if it's the canned assistant greeting
        if (index === 0 && m.role === "assistant") return false;
        return true;
      });

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setShowSuggestions(true);
    setInput("");
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              bottom: "90px",
              right: "24px",
              width: "340px",
              zIndex: 100,
              background: "#0D1320",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.15)",
              display: "flex",
              flexDirection: "column",
              maxHeight: "520px",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 18px",
                background: "#121B2E",
                borderBottom: "1px solid rgba(99,102,241,0.12)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366F1, #22D3EE)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Bot size={16} color="white" />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#F1F5F9",
                    margin: 0,
                  }}
                >
                  Ask about Anubhav
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#10B981",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#10B981",
                      display: "inline-block",
                    }}
                  />
                  AI Assistant · Online
                </p>
              </div>

              {/* Controls */}
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={handleReset}
                  title="Reset chat"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "7px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#475569",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#94A3B8";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#475569";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                  }}
                >
                  ↺
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "7px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#475569",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#94A3B8";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#475569";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                  }}
                >
                  <Minimize2 size={13} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                scrollbarWidth: "thin",
                scrollbarColor: "#6366F1 transparent",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: "10px 13px",
                      borderRadius:
                        msg.role === "user"
                          ? "14px 14px 4px 14px"
                          : "14px 14px 14px 4px",
                      fontSize: "13px",
                      lineHeight: 1.55,
                      ...(msg.role === "user"
                        ? {
                            background: "rgba(99,102,241,0.15)",
                            border: "1px solid rgba(99,102,241,0.25)",
                            color: "#F1F5F9",
                          }
                        : {
                            background: "#121B2E",
                            border: "1px solid rgba(255,255,255,0.06)",
                            color: "#94A3B8",
                          }),
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: "14px 14px 14px 4px",
                      background: "#121B2E",
                      border: "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Loader2
                      size={13}
                      color="#6366F1"
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    <span style={{ fontSize: "12px", color: "#475569" }}>
                      Thinking...
                    </span>
                  </div>
                </div>
              )}

              {/* Suggested questions */}
              {showSuggestions && messages.length === 1 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    marginTop: "4px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#475569",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      margin: "0 0 4px",
                    }}
                  >
                    Try asking:
                  </p>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid rgba(99,102,241,0.2)",
                        background: "rgba(99,102,241,0.06)",
                        color: "#94A3B8",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(99,102,241,0.12)";
                        e.currentTarget.style.color = "#F1F5F9";
                        e.currentTarget.style.borderColor =
                          "rgba(99,102,241,0.35)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(99,102,241,0.06)";
                        e.currentTarget.style.color = "#94A3B8";
                        e.currentTarget.style.borderColor =
                          "rgba(99,102,241,0.2)";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: "12px 14px",
                borderTop: "1px solid rgba(99,102,241,0.1)",
                display: "flex",
                gap: "8px",
                alignItems: "flex-end",
                flexShrink: 0,
                background: "#0D1320",
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                rows={1}
                style={{
                  flex: 1,
                  background: "#121B2E",
                  border: "1px solid rgba(99,102,241,0.18)",
                  borderRadius: "10px",
                  padding: "9px 12px",
                  fontSize: "13px",
                  color: "#F1F5F9",
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  outline: "none",
                  resize: "none",
                  lineHeight: 1.5,
                  maxHeight: "80px",
                  overflowY: "auto",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(99,102,241,0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(99,102,241,0.18)";
                }}
              />
              <motion.button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background:
                    input.trim() && !isLoading
                      ? "linear-gradient(135deg, #6366F1, #22D3EE)"
                      : "#121B2E",
                  border: "1px solid rgba(99,102,241,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor:
                    input.trim() && !isLoading ? "pointer" : "not-allowed",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
                whileHover={input.trim() && !isLoading ? { scale: 1.08 } : {}}
                whileTap={input.trim() && !isLoading ? { scale: 0.95 } : {}}
              >
                {isLoading ? (
                  <Loader2
                    size={14}
                    color="#475569"
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  <Send size={14} color={input.trim() ? "white" : "#475569"} />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366F1, #22D3EE)",
          border: "none",
          cursor: "pointer",
          zIndex: 99,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 8px 32px rgba(99,102,241,0.5), 0 0 0 4px rgba(99,102,241,0.1)",
        }}
        whileHover={{
          scale: 1.1,
          boxShadow:
            "0 12px 40px rgba(99,102,241,0.6), 0 0 0 6px rgba(99,102,241,0.15)",
        }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} color="white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Bot size={22} color="white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Online dot */}
        {!isOpen && (
          <div
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#10B981",
              border: "2px solid #070B12",
              boxShadow: "0 0 8px #10B981",
            }}
          />
        )}
      </motion.button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 480px) {
          .chat-panel-mobile {
            right: 12px !important;
            left: 12px !important;
            width: auto !important;
          }
        }
      `}</style>
    </>
  );
}
