import React, { useState } from 'react';
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { useAppContext } from '../context/AppContext';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
     
    ]);
    const { UserDetails } = useAppContext();

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                sender: 'You',
                time: 'Just now',
                content: message,
                isSupport: false
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };


    return (
        <div className="fixed bottom-[10%] right-[3%] z-50 ">
            {/* Floating Chat Icon */}
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="bg-gradient-to-r from-primary to-primary-dull hover:scale-105 text-white p-4 cursor-pointer rounded-full shadow-2xl transition-all duration-300 fixed bottom-5 right-10"
                    title="Chat with us"
                >
                    <IoChatbubblesOutline size={28} />
                </button>
            )}

            {/* Chat Box */}
            <div
                className={`transition-all ${!isOpen ? "hidden" : "block"} duration-300 ease-in-out transform ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
                    } mt-4 w-80 bg-black rounded-2xl shadow-2xl border border-gray-800 p-4`}
            >
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img src={UserDetails?.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-primary">{UserDetails?.fullname}</h4>
                            <p className="text-xs text-primary-dull/60">{UserDetails?.email}</p>
                        </div>
                    </div>
                    <button onClick={toggleChat} className="text-gray-400 cursor-pointer hover:text-white text-lg">
                        <IoCloseSharp />
                    </button>
                </div>

                <div className="h-60 mb-3 mt-5 overflow-y-auto text-sm">
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-4 ${msg.isSupport ? '' : 'text-right'}`}>
                            <div className={`${msg.isSupport ? 'bg-gray-800 text-white rounded-tl-none' : 'bg-white text-black rounded-tr-none'} p-3 rounded-2xl max-w-[80%] inline-block`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                
                </div>

                <div className="relative">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-3 pr-12 bg-gray-800 border-none rounded-full text-sm text-white placeholder-gray-400 focus:outline-none"
                        placeholder="Type your message..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-dull cursor-pointer text-white p-2 rounded-full transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWidget;
