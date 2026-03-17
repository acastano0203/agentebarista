import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  User,
  Coffee as CoffeeIcon,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  getBaristaResponse,
  profileUserTaste,
} from "../services/geminiService";
import type { Message, CoffeeProfile } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface BaristaChatProps {
  onProfileGenerated: (profile: CoffeeProfile) => void;
}

export const BaristaChat: React.FC<BaristaChatProps> = ({
  onProfileGenerated,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "¡Hola! Soy tu Barista personal. Me encantaría ayudarte a encontrar el café perfecto para ti. ¿Qué notas de sabor sueles preferir? ¿Algo achocolatado, frutal o quizás con una acidez cítrica vibrante?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isProfiling, setIsProfiling] = useState(false);
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
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));
      history.push({ role: "user", parts: [{ text: userMessage }] });

      const response = await getBaristaResponse(history);
      const newMessages: Message[] = [
        ...messages,
        { role: "user", text: userMessage },
        { role: "model", text: response || "" },
      ];
      setMessages(newMessages);

      // Auto-profile after 2 user messages to show results quickly
      const userMessageCount = newMessages.filter(
        (m) => m.role === "user",
      ).length;
      if (userMessageCount >= 1) {
        setIsProfiling(true);
        const chatHistory = newMessages
          .map((m) => `${m.role === "user" ? "Cliente" : "Barista"}: ${m.text}`)
          .join("\n");
        const profile = await profileUserTaste(chatHistory);
        onProfileGenerated(profile);
        setIsProfiling(false);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Hubo un error. ¿Reintentamos?" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateProfile = async () => {
    // Manual trigger if needed, but now it's mostly auto
    if (messages.length < 2) return;
    setIsProfiling(true);
    try {
      const chatHistory = messages
        .map((m) => `${m.role === "user" ? "Cliente" : "Barista"}: ${m.text}`)
        .join("\n");
      const profile = await profileUserTaste(chatHistory);
      onProfileGenerated(profile);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProfiling(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-brand-cream rounded-3xl shadow-xl border border-brand-burgundy/10 overflow-hidden">
      <div className="bg-brand-burgundy p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-forest rounded-full flex items-center justify-center text-white">
            <CoffeeIcon size={20} />
          </div>
          <div>
            <h3 className="text-white font-medium">Agente Barista</h3>
            <p className="text-brand-lime text-xs">
              {isProfiling
                ? "Perfilando tus gustos..."
                : "Experto en Perfilado"}
            </p>
          </div>
        </div>
        {isProfiling && (
          <div className="flex items-center gap-2 text-brand-lime text-xs animate-pulse">
            <Sparkles size={14} />
            <span>Filtrando...</span>
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-forest/5"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-brand-burgundy text-white rounded-tr-none"
                    : "bg-white text-brand-burgundy shadow-sm border border-brand-burgundy/10 rounded-tl-none"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-brand-burgundy/10">
              <Loader2 size={18} className="animate-spin text-brand-lime" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-brand-burgundy/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe tus preferencias..."
            className="flex-1 bg-brand-cream border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-lime outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-brand-burgundy text-white p-3 rounded-xl hover:bg-brand-forest transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
