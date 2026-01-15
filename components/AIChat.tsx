
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Globe } from 'lucide-react';
import { chatWithAssistant } from '../services/gemini';
import { ChatMessage, Language } from '../types';
import { translations } from '../translations';

interface AIChatProps {
  language: Language;
}

export const AIChat: React.FC<AIChatProps> = ({ language: initialLanguage }) => {
  const [chatLanguage, setChatLanguage] = useState<Language>(initialLanguage);
  const t = translations[chatLanguage];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync with global language if chat hasn't started or when it changes
  useEffect(() => {
    if (messages.length <= 1) {
      setChatLanguage(initialLanguage);
    }
  }, [initialLanguage]);

  // Handle initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'model', text: t.aiGreeting }]);
    }
  }, [chatLanguage, t.aiGreeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    history.push({ role: 'user', parts: [{ text: userMsg }] });

    const aiResponse = await chatWithAssistant(history, chatLanguage);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition-all transform hover:scale-110 flex items-center gap-2 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <Sparkles size={24} />
        <span className="font-bold hidden sm:inline">{t.aiName}</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
          <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold">{t.aiName}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-blue-300 uppercase tracking-widest font-semibold">Osh Local Expert</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex bg-white/10 rounded-lg p-0.5 mr-2">
                <button 
                  onClick={() => setChatLanguage('kg')}
                  className={`px-2 py-0.5 text-[9px] font-bold rounded ${chatLanguage === 'kg' ? 'bg-white text-slate-900' : 'text-white/50 hover:text-white'}`}
                >
                  KG
                </button>
                <button 
                  onClick={() => setChatLanguage('ru')}
                  className={`px-2 py-0.5 text-[9px] font-bold rounded ${chatLanguage === 'ru' ? 'bg-white text-slate-900' : 'text-white/50 hover:text-white'}`}
                >
                  RU
                </button>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl flex gap-3 ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                }`}>
                  <div className="flex-1 text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none flex gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.aiPlaceholder}
                className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-2 uppercase tracking-tighter">
              {t.aiFooter}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
