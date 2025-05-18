
import React, { useState } from 'react';
import ChatList from '../../Components/Admin/ChatList';
import ChatWindow from '../../Components/Admin/ChatWindow';
import { IoSearchOutline } from "react-icons/io5";
import { useAppContext } from '../../context/AppContext';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { AdminDetails } = useAppContext();
  console.log(AdminDetails);

  // Mock data for chat users
  const chatUsers = [
    {
      id: 1,
      name: 'Felecia Rower',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastMessage: 'If it takes long you can mail me at my mail address.',
      time: '10 AM',
      isOnline: true,
      unread: 0,
      messages: [
        { id: 1, text: 'Hello. How can I help You?', sender: 'admin', time: '12:45 PM' },
        { id: 2, text: 'Can I get details of my last transaction I made last month?', sender: 'user', time: '12:46 PM' },
        { id: 3, text: 'We need to check if we can provide you such information.', sender: 'admin', time: '12:45 PM' },
        { id: 4, text: 'I will inform you as I get update on this.', sender: 'admin', time: '12:46 PM' },
        { id: 5, text: 'If it takes long you can mail me at my mail address.', sender: 'user', time: '10:03 AM' },
      ]
    },
    {
      id: 2,
      name: 'Adalberto Granzin',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastMessage: 'I will purchase it for sure.',
      time: '10 AM',
      isOnline: false,
      unread: 1,
      messages: []
    },
    {
      id: 3,
      name: 'Joaquina Weisenborn',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      lastMessage: 'Soufflé soufflé caramels.',
      time: '10 AM',
      isOnline: false,
      unread: 1,
      messages: []
    },
    {
      id: 4,
      name: 'Verla Morgano',
      avatar: 'https://randomuser.me/api/portraits/women/49.jpg',
      lastMessage: 'Chupa chups candy...',
      time: '10 AM',
      isOnline: true,
      unread: 2,
      messages: []
    },
    {
      id: 5,
      name: 'Margot Henschke',
      avatar: 'https://randomuser.me/api/portraits/women/30.jpg',
      lastMessage: 'Cake pie jelly...',
      time: '10 AM',
      isOnline: false,
      unread: 0,
      messages: []
    },
    {
      id: 6,
      name: 'Sal Piggee',
      avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
      lastMessage: 'Toffee caramels jelly...',
      time: '10 AM',
      isOnline: false,
      unread: 2,
      messages: []
    }
  ];

  const filteredUsers = chatUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-lg overflow-hidden shadow-md">
      {/* Left sidebar - Chat list */}
      <div className="w-1/4 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={AdminDetails?.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{AdminDetails?.fullname}</h4>
              <p className="text-xs text-gray-500">{AdminDetails?.email}</p>
            </div>
          </div>
          
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search by name"
              className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        
        
        <div className="flex-1 overflow-y-auto">
          <ChatList 
            users={filteredUsers} 
            selectedUserId={selectedUser?.id} 
            onSelectUser={handleUserSelect} 
          />
        </div>
      </div>
      
      {/* Right side - Chat window */}
      <div className="w-3/4 flex flex-col">
        {selectedUser ? (
          <ChatWindow user={selectedUser} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <div className="w-24 h-24 mb-4 opacity-50">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 10.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 14H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-lg font-medium mb-1">No message yet...</p>
            <p className="text-sm">don't worry, just take a deep breath & say "Hello"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat
