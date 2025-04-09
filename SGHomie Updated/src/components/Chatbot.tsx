import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_PROMPTS = [
  { text: "How do I buy a property?", category: "Buying" },
  { text: "How can I sell my property?", category: "Selling" },
  { text: "What payment methods are accepted?", category: "Payments" },
  { text: "How do I arrange a viewing?", category: "Viewing" },
  { text: "What property types are available?", category: "Properties" },
  { text: "How do I contact support?", category: "Support" },
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: { message: userMessage }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt);
    handleSubmit(new Event('submit') as any);
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsMinimized(!isMinimized);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating button when chat is closed */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <MessageCircle className="h-6 w-6" />
          <span>Any questions? Ask chatbot</span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          ref={chatboxRef}
          className={`bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out ${
            isMinimized ? 'h-14' : 'h-[500px]'
          } w-[380px] flex flex-col`}
        >
          {/* Chat header */}
          <div
            className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg cursor-pointer"
            onClick={toggleChat}
          >
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">SG Homie Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              {isMinimized ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <>
                  <ChevronDown className="h-5 w-5" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeChat();
                    }}
                    className="hover:bg-blue-700 rounded-full p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Chat messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="space-y-4">
                    <div className="text-center text-gray-500">
                      👋 Hi! I'm your SG Homie Assistant. I can help you with:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {SUGGESTED_PROMPTS.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handlePromptClick(prompt.text)}
                          className="text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <div className="font-medium text-blue-600">{prompt.category}</div>
                          <div className="text-gray-600 truncate">{prompt.text}</div>
                        </button>
                      ))}
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      Click on any topic above or type your question below!
                    </div>
                  </div>
                )}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          a: ({ href, children }) => (
                            <a href={href} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !message.trim()}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;