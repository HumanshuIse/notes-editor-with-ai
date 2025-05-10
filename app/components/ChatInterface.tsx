'use client';

import React, { useState } from 'react';
import useNotesStore from '../stores/useNotesStore';

interface ChatInterfaceProps {
  noteId: string;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ noteId, onClose }) => {
  const [input, setInput] = useState('');
  const { notes, addChatMessage } = useNotesStore();
  
  const currentNote = notes.find(note => note.id === noteId);
  const chatHistory = currentNote?.chatHistory || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message (right aligned)
    addChatMessage(noteId, input, true);
    setInput('');
    
    // Simulate AI response (left aligned)
    setTimeout(() => {
      const responses = [
        "I analyzed your note and suggest focusing on the key points.",
        "Based on your content, you might want to add more details here.",
        "This is an AI-generated response to your query.",
        "Have you considered organizing this information differently?",
        "I can help you expand on these ideas if you'd like."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addChatMessage(noteId, randomResponse, false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-10">
      <div className="p-4 border-b border-gray-200 bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-bold">AI Assistant</h3>
        <button 
          onClick={onClose} 
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          ×
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto max-h-96">
        {chatHistory.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Ask the AI assistant for help with your note
          </div>
        ) : (
          <div className="space-y-4">
            {chatHistory.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something about this note..."
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;