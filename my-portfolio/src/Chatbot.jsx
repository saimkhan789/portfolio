import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey there! I’m Jarvis, How may i help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);

  const toggleChatbot = () => {
    console .log('Toggling chatbot, current isOpen:', isOpen);
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        messages: [
          { role: 'system', content: 'You are Jarvis, a helpful and friendly AI assistant created by Saim Khan for his portfolio app.' },
          ...messages.map((msg) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          })),
          { role: 'user', content: input }
        ]
      });
      const botResponse = response.data.message;
      console.log ('gptresopnse',response)
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Error calling backend:', error.response ? error.response.data : error.message);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: `Error: ${error.response?.data?.error || 'Failed to connect to backend. Check if the server is running.'}` }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <button
        onClick={toggleChatbot}
        className="fixed bottom-20 right-5 sm:right-5 bg-gradient-to-r from-pink-600 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:shadow-neon hover:scale-110 transition-all duration-300 z-50"
        aria-label="Toggle chatbot"
      >
        💬
      </button>
      {isOpen && (
        <div
          className="fixed bottom-20 right-5 sm:right-5 w-[90vw] max-w-[400px] h-[500px] sm:h-[450px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl z-40 flex flex-col transition-all duration-300 ease-in-out transform scale-100 origin-bottom-right"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white p-4 rounded-t-3xl flex justify-between items-center">
            <span className="text-lg font-semibold tracking-tight">Jarvis</span>
            <button
              onClick={toggleChatbot}
              className="text-white hover:text-gray-200 transition-colors duration-200"
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>
          <div
            ref={chatBodyRef}
            className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-black/50"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
              >
                <span
                  className={`inline-block p-3 rounded-2xl max-w-[75%] text-sm font-medium ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 text-white'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200'
                  } shadow-md transition-all duration-200`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <span className="inline-block p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium animate-pulse">
                  Typing...
                </span>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-pink-300/20 dark:border-cyan-700/20">
            <input
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask away..."
              className="w-full px-4 py-2 bg-transparent border-2 border-pink-400/50 dark:border-cyan-500/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-cyan-400 transition-all duration-200 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium"
            />
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Chatbot;