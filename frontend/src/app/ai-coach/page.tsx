"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

type Message = { id: number; text: string; isUser: boolean };

export default function AICoach() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your AI Fitness Coach. What are your fitness goals today?", isUser: false },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), text: input, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI typing delay
    setTimeout(() => {
      const aiMsg: Message = { 
        id: Date.now() + 1, 
        text: "I can help with that! Let's set up a plan that works for you. Remember to stay consistent and hydrate.", 
        isUser: false 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white p-6 md:p-12">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-electric-blue flex items-center gap-3">
          <Bot size={36} /> AI Coach
        </h1>
        <p className="text-zinc-400 mt-2">Get personalized fitness and nutrition advice.</p>
      </header>

      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] gap-3 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.isUser ? 'bg-blue-600' : 'bg-zinc-700'}`}>
                  {msg.isUser ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className={`px-4 py-3 rounded-2xl ${msg.isUser ? 'bg-blue-600 rounded-tr-sm' : 'bg-zinc-800 rounded-tl-sm'}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about your workout or diet..." 
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button 
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
