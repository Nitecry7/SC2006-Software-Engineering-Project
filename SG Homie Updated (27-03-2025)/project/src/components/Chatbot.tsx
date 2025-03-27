import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      let response = "I'm sorry, I don't understand that question.";

      // Simple pattern matching for common questions
      if (userMessage.toLowerCase().includes('price')) {
        response = "Based on recent data, HDB prices have shown an average increase of 5% year-over-year. The most expensive areas are currently in the Central Area and Queenstown, while more affordable options can be found in Woodlands and Jurong West.";
      } else if (userMessage.toLowerCase().includes('location')) {
        response = "Popular locations for HDB flats include Tampines, Punggol, and Sengkang. These areas offer good amenities and connectivity. The choice of location should depend on your workplace, budget, and lifestyle preferences.";
      } else if (userMessage.toLowerCase().includes('grant')) {
        response = "There are several HDB grants available:\n\n- Enhanced CPF Housing Grant (EHG): Up to $80,000\n- Family Grant: Up to $50,000\n- Proximity Housing Grant: Up to $30,000\n\nEligibility depends on factors like income ceiling and citizenship status.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b bg-brand-600 text-white rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">SG Homie Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-brand-700 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-brand-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
                <button
                  onClick={handleSend}
                  className="p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-600 text-white p-4 rounded-full shadow-lg hover:bg-brand-700 transition-colors"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default Chatbot;