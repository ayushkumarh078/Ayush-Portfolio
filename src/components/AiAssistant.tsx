"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, User, Sparkles } from "lucide-react";

type Message = {
  id: string;
  sender: "ai" | "user";
  text: string;
};

const INITIAL_MESSAGE: Message = {
  id: "1",
  sender: "ai",
  text: "Hi! I'm Ayush's AI Assistant. I know everything about his resume, projects, and skills. What would you like to know?"
};

const KNOWLEDGE_BASE: Record<string, string> = {
  "resume": "Ayush is a Software Engineer transitioning from an Enterprise QA role at FSSAI. He specializes in Python, React, and AWS. You can download his full resume from the Hero section!",
  "projects": "He has built some amazing things! Highlights include an AI Quiz Generator using AWS Lambda, an Edge AI ATM Security system on Raspberry Pi, and a Self-Aiming Smart Trash Can.",
  "contact": "You can reach Ayush at ayushkumarh078@gmail.com, or find him on LinkedIn and GitHub. Check the links at the top of the page!",
  "skills": "Ayush is highly proficient in Python, Java, TypeScript, and Go. For backend, he uses Node.js and Flask. For frontend, React and Next.js.",
  "default": "That's a great question! While I'm just a simulated AI for this portfolio, Ayush would love to answer that in an interview. You should definitely reach out to him!"
};

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: userQuery };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // 1. Log the question to Ayush via Webhook (Discord / Formspree)
    // Replace this URL with your actual Formspree endpoint or Discord Webhook!
    const WEBHOOK_URL = process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL || "";
    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `**New Chat Query on Portfolio:**\n"${userQuery}"`
          })
        });
      } catch (e) {
        console.error("Failed to log chat");
      }
    }

    // 2. Generate a smart contextual response
    setTimeout(() => {
      let responseText = KNOWLEDGE_BASE["default"];
      const lowerInput = userQuery.toLowerCase();
      
      if (lowerInput.includes("resume") || lowerInput.includes("experience") || lowerInput.includes("work") || lowerInput.includes("job") || lowerInput.includes("intern")) {
        responseText = KNOWLEDGE_BASE["resume"];
      }
      else if (lowerInput.includes("project") || lowerInput.includes("build") || lowerInput.includes("portfolio") || lowerInput.includes("code")) {
        responseText = KNOWLEDGE_BASE["projects"];
      }
      else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("hire") || lowerInput.includes("reach") || lowerInput.includes("linkedin")) {
        responseText = KNOWLEDGE_BASE["contact"];
      }
      else if (lowerInput.includes("skill") || lowerInput.includes("tech") || lowerInput.includes("language") || lowerInput.includes("python") || lowerInput.includes("react") || lowerInput.includes("aws")) {
        responseText = KNOWLEDGE_BASE["skills"];
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: "ai", text: responseText };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Ayush AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-text-secondary font-mono">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-muted hover:text-foreground transition-colors p-2">
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mb-1">
                      <Bot size={12} />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-primary text-background rounded-br-sm" 
                      : "bg-border/50 text-foreground border border-border rounded-bl-sm"
                  }`}>
                    {msg.text}
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-primary-muted shrink-0 mb-1">
                      <User size={12} />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mb-1">
                    <Bot size={12} />
                  </div>
                  <div className="bg-border/50 border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-text-secondary rounded-full" />
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-text-secondary rounded-full" />
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-text-secondary rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 border-t border-border bg-background/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Ayush..."
                  className="w-full bg-background border border-border rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-text-secondary transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-background disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
