"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { fetchApi } from '@/lib/api';
import { Input } from '@/components/ui/input';

type Message = { id: string | number; text: string; isUser: boolean };

export default function AICoach() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetchApi('/ai/history');
        if (res && res.length > 0) {
          const formatted = res.map((msg: any) => ({
            id: msg.id,
            text: msg.message,
            isUser: msg.isUser
          }));
          setMessages(formatted);
        } else {
          setMessages([
            { id: 1, text: "Hello! I'm your AI Fitness Coach. What are your fitness goals today?", isUser: false },
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    }
    fetchHistory();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now(), text: input, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetchApi('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message: userMsg.text })
      });
      
      const aiMsg: Message = { 
        id: Date.now() + 1, 
        text: res.response || "Sorry, I didn't get that.", 
        isUser: false 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errMsg: Message = { 
        id: Date.now() + 1, 
        text: "Sorry, I am having trouble connecting to my brain right now.", 
        isUser: false 
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-black text-white p-6 md:p-12">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-electric-blue flex items-center gap-3">
            <Bot size={36} /> AI Coach
          </h1>
          <p className="text-zinc-400 mt-2">Get personalized fitness and nutrition advice.</p>
        </header>

        <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {fetching ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin text-electric-blue" size={32} />
              </div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[80%] gap-3 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.isUser ? 'bg-blue-600' : 'bg-zinc-700'}`}>
                      {msg.isUser ? <User size={18} /> : <Bot size={18} />}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${msg.isUser ? 'bg-blue-600 rounded-tr-sm' : 'bg-zinc-800 rounded-tl-sm'}`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-zinc-700">
                    <Bot size={18} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-zinc-800 rounded-tl-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex gap-4">
            <Input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your workout or diet..." 
              className="flex-1 h-12"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-lg flex items-center justify-center transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
