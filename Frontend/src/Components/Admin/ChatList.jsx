import React from 'react';

const ChatList = ({ users, selectedUserId, onSelectUser }) => {
  return (
    <div className="divide-y divide-gray-200">
      {users.map(user => (
        <div 
          key={user.id}
          className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${selectedUserId === user.id ? 'bg-gray-50' : ''}`}
          onClick={() => onSelectUser(user)}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            {user.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-900 truncate">{user.name}</h3>
              <span className="text-xs text-gray-500">{user.time}</span>
            </div>
            <p className="text-xs text-gray-500 truncate">{user.lastMessage}</p>
          </div>
          
          {user.unread > 0 && (
            <div className="ml-2 flex-shrink-0 w-5 h-5 bg-primary  rounded-full flex items-center justify-center">
              <span className="text-xs text-white">{user.unread}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatList;