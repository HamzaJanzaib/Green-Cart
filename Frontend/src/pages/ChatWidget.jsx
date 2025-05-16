import React, { useState } from 'react';
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
     
    ]);

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
                    } mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4`}
            >
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">Chat Support</h4>
                    <button onClick={toggleChat} className="text-gray-500 hover:text-red-500 text-lg">
                        <IoCloseSharp />
                    </button>
                </div>

                <div className="h-60 border border-gray-200 rounded-lg p-2 mb-3 overflow-y-auto text-sm">
                    {messages.length === 0 ? (
                        <p className="italic text-center text-gray-400">No messages yet...</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className="mb-3">
                                {msg.sender && (
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`font-semibold ${msg.isSupport ? 'text-blue-600' : 'text-gray-800'}`}>
                                            {msg.sender}
                                        </span>
                                        <span className="text-xs text-gray-500">{msg.time}</span>
                                    </div>
                                )}
                                {msg.content ? (
                                    <p className="text-gray-700">{msg.content}</p>
                                ) : (
                                    <p className="text-xs text-gray-400 text-right">{msg.time}</p>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="2"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none resize-none"
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWidget;