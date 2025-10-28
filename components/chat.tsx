"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  sender: "ai" | "user";
  text: string;
  image?: string;
};

export default function AIChatSidebar() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "👋 Hello! I'm your AI assistant." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    const userInput = input.toLowerCase();
    setInput("");
    setIsTyping(true);

    // Simulate AI response with hardcoded image logic
    setTimeout(() => {
      let response: Message = { sender: "ai", text: "🤖 This is a sample AI response." };

      // Check for "grafico" and "año"
      if (userInput.includes("grafico") && userInput.includes("año")) {
        response = {
          sender: "ai",
          text: "Aquí está el gráfico de año de creación:",
          image: "/ano_creacion_vie.png",
        };
      }
      // Check for "grafico" and "genero"
      else if (userInput.includes("grafico") && userInput.includes("genero")) {
        response = {
          sender: "ai",
          text: "Aquí está el gráfico de género:",
          image: "/genero_vie.png",
        };
      }

      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1200);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full shadow-lg",
          "bg-background border border-border hover:bg-accent transition-all",
          isOpen && "left-[384px]"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-foreground" />
        ) : (
          <MessageSquare className="w-5 h-5 text-foreground" />
        )}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -384 }}
            animate={{ x: 0 }}
            exit={{ x: -384 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-screen w-96 z-30 border-r border-border bg-background/95 backdrop-blur-xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">🤖 AI Assistant</h2>
            </div>

            {/* Messages */}
            <div className="flex-1 px-6 py-4 overflow-y-auto space-y-3 text-sm flex flex-col">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    "px-4 py-2 rounded-lg shadow-sm flex flex-col gap-2",
                    msg.sender === "ai"
                      ? "bg-muted text-foreground self-start max-w-[85%]"
                      : "bg-primary text-primary-foreground self-end max-w-[80%]"
                  )}
                >
                  <span>{msg.text}</span>
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Chart"
                      className="rounded-lg mt-2 w-full h-auto"
                    />
                  )}
                </motion.div>
              ))}

              {/* AI Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex items-center gap-1 px-4 py-2 rounded-lg max-w-[30%] bg-muted self-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.6, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  <span className="w-2 h-2 rounded-full bg-foreground animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-foreground animate-pulse delay-200"></span>
                  <span className="w-2 h-2 rounded-full bg-foreground animate-pulse delay-400"></span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-end gap-2 p-4 border-t border-border">
              <textarea
                ref={textareaRef}
                className="flex-1 px-4 py-3 text-sm bg-muted rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none min-h-[44px] max-h-[200px]"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
