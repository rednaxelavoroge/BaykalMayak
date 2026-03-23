import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, Send, Sparkles, MapPin, Search, Bot } from "lucide-react";
import Markdown from "react-markdown";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AIConcierge() {
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string; grounding?: any[] }[]>([
    { role: "model", text: "Welcome to Baikal Mayak. I am your AI concierge. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [...messages, { role: "user", text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "You are the AI concierge for Baikal Mayak Resort. You are sophisticated, helpful, and knowledgeable about Lake Baikal and the resort. Use Google Search and Maps grounding to provide accurate information about local attractions, weather, and travel tips.",
          tools: [{ googleSearch: {} }, { googleMaps: {} }]
        }
      });

      const text = response.text || "I apologize, I'm having trouble connecting right now.";
      const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      setMessages(prev => [...prev, { role: "model", text, grounding }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: "model", text: "I'm sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="concierge" className="py-24 bg-[#0a0a0a] flex flex-col items-center">
      <div className="max-w-4xl w-full px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10"
          >
            <Bot className="text-white w-8 h-8" />
          </motion.div>
          <h2 className="text-white font-serif text-4xl uppercase tracking-widest mb-4 italic">AI Concierge</h2>
          <p className="text-white/40 font-sans text-sm tracking-widest uppercase">Your digital guide to the deepest lake on Earth</p>
        </div>

        <div className="bg-[#151619] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white/60 text-[10px] uppercase tracking-widest font-mono">System Online</span>
            </div>
            <div className="flex items-center gap-4">
              <Search className="w-4 h-4 text-white/20" />
              <MapPin className="w-4 h-4 text-white/20" />
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-xl text-sm ${
                    msg.role === "user" 
                      ? "bg-white text-black font-medium" 
                      : "bg-white/5 text-white/80 border border-white/10"
                  }`}>
                    <div className="markdown-body prose prose-invert prose-sm">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                    {msg.grounding && msg.grounding.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                        {msg.grounding.map((chunk: any, idx: number) => (
                          chunk.web && (
                            <a 
                              key={idx} 
                              href={chunk.web.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[10px] text-white/40 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/5 transition-colors"
                            >
                              <Search className="w-3 h-3" />
                              {chunk.web.title || "Source"}
                            </a>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex gap-1">
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-black/40 border-t border-white/10">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about local attractions, weather, or resort services..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 pr-14 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 p-2 bg-white rounded-full text-black hover:bg-white/80 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
