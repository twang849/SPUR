"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PandaTherapist() {
  const router = useRouter();
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([
    {
      text: "Hello, I'm Panda. Stillness reveals what noise hides. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function appendMessage(text: string, sender: "user" | "bot") {
    setMessages((prev) => [...prev, { text, sender }]);
  }

  function botReply(userText: string) {
    const lower = userText.toLowerCase();
    if (/hello|hi|hey/.test(lower)) {
      appendMessage("Hello. I'm here to listen.", "bot");
    } else if (/sad|tired|burnout|overwhelmed/.test(lower)) {
      appendMessage("Take a deep breath. Sometimes, stillness is the best answer.", "bot");
    } else if (/thank/.test(lower)) {
      appendMessage("You're welcome. Remember, peace is within.", "bot");
    } else {
      appendMessage("I'm listening. Share as much as you wish.", "bot");
    }
  }

  function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;
    appendMessage(trimmed, "user");
    setInput("");
    setTimeout(() => botReply(trimmed), 600);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  function goBack() {
    router.back();
  }

  return (
    <>
      <style>{`
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #f6f8fa;
          margin: 0;
          padding: 0;
          min-height: 100vh;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          min-height: 100vh;
          padding: 0 16px 32px 16px;
        }
        .animal-emoji-large {
          font-size: 7rem;
          margin-top: 60px;
          margin-bottom: 18px;
          text-align: center;
        }
        .chatbot-container {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
          width: 100%;
          max-width: 420px;
          padding: 28px 18px 18px 18px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .messages {
          min-height: 120px;
          max-height: 220px;
          overflow-y: auto;
          margin-bottom: 18px;
          font-size: 1.05rem;
          color: #333;
        }
        .user-msg {
          text-align: right;
          color: #2563eb;
          margin-bottom: 8px;
          word-wrap: break-word;
        }
        .bot-msg {
          text-align: left;
          color: #444;
          margin-bottom: 8px;
          word-wrap: break-word;
        }
        .chat-input-row {
          display: flex;
          gap: 8px;
        }
        .chat-input {
          flex: 1;
          padding: 10px 12px;
          border-radius: 7px;
          border: 1px solid #cfd8dc;
          font-size: 1rem;
          outline: none;
          color: #000;
        }
        .send-btn {
          background: #4f8cff;
          color: #fff;
          border: none;
          border-radius: 7px;
          padding: 0 18px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s;
        }
        .send-btn:hover, .send-btn:focus {
          background: #2563eb;
        }
        .voice-btn {
          margin: 18px auto 0 auto;
          display: block;
          background: #e3f0ff;
          color: #2563eb;
          border: none;
          border-radius: 50%;
          width: 54px;
          height: 54px;
          font-size: 2rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(79,140,255,0.10);
          transition: background 0.18s;
        }
        .voice-btn:hover, .voice-btn:focus {
          background: #c7e0ff;
        }
        .back-btn {
          position: absolute;
          top: 24px;
          left: 24px;
          background: #e3f0ff;
          color: #2563eb;
          border: none;
          border-radius: 7px;
          padding: 8px 18px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(79,140,255,0.10);
          transition: background 0.18s;
          z-index: 10;
        }
        .back-btn:hover, .back-btn:focus {
          background: #c7e0ff;
        }
      `}</style>

      <div className="container">
        <button className="back-btn" onClick={goBack} aria-label="Back to main page">
          ← Back
        </button>
        <div className="animal-emoji-large" aria-label="Panda emoji">
          🐼
        </div>
        <div className="chatbot-container" role="region" aria-live="polite" aria-label="Chatbot conversation">
          <div className="messages" id="messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.sender === "user" ? "user-msg" : "bot-msg"}
                role="article"
                aria-live={msg.sender === "bot" ? "polite" : undefined}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-row">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Chat input"
            />
            <button className="send-btn" onClick={sendMessage} aria-label="Send message">
              Send
            </button>
          </div>
          <button
            className="voice-btn"
            title="Voice Chat"
            onClick={() => alert("Voice chat coming soon!")}
            aria-label="Start voice chat"
          >
            🎤
          </button>
        </div>
      </div>
    </>
  );
}
