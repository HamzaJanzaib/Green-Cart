import React, { useState, useRef, useEffect } from 'react';
import { IoSendSharp, IoHappyOutline, IoAttachOutline, IoAddCircleOutline } from "react-icons/io5";
import { useAppContext } from '../../context/AppContext';

const ChatWindow = ({ user }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [user.messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send this to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            {user.isOnline && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
            <p className="text-xs text-green-500">{user.isOnline ? 'Active Now' : 'Offline'}</p>
          </div>
        </div>

      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {user.messages.map((msg) => (
            <Message key={msg.id} message={msg} isAdmin={msg.sender === 'admin'} userAvatar={user.avatar} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <button className="text-gray-500 mr-2">
            <IoAddCircleOutline size={20} />
          </button>
          <button className="text-gray-500 mr-2">
            <IoAttachOutline size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button className="text-gray-500 mx-2">
            <IoHappyOutline size={20} />
          </button>
          <button
            onClick={handleSendMessage}
            className={`p-2 rounded-full ${message.trim() ? 'bg-primary text-white cursor-pointer' : 'bg-gray-300 text-gray-500 '}`}
          >
            <IoSendSharp size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

// Message component
const Message = ({ message, isAdmin, userAvatar }) => {
  const { AdminDetails } = useAppContext();
  const adminAvatar = AdminDetails?.profilePicture;
  if (isAdmin) {
    return (
      <div className="flex items-start justify-end">
        <div className="flex flex-col max-w-[70%]">
          <div className="bg-primary/80 text-white p-3 rounded-lg rounded-tr-none">
            <p className="text-sm">{message.text}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1 flex justify-end">{message.time}</span>
        </div>
        <div className="flex-shrink-0 ml-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={adminAvatar} alt="Admin" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={userAvatar} alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex flex-col max-w-[70%]">
          <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none">
            <p className="text-sm">{message.text}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1">{message.time}</span>
        </div>
      </div>
    );
  }
};

export default ChatWindow;