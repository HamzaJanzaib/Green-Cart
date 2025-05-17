import React, { useState, useEffect } from 'react';
import { ProfilesideBar } from '../Components/Client/Index';
import { Outlet } from 'react-router-dom';


const Profile = () => {
  const [data, setData] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  // Responsive listener
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate fetching user data
  useEffect(() => {
    setTimeout(() => {
      setData({
        fullname: 'John Doe',
        email: 'john@example.com',
        ProfileUrl: '',
      });
    }, 1000);
  }, []);

  if (!data) {
    return (
      <div className='flex items-center justify-center h-screen bg-white'>
        <img
          src='https://www.movingtree.com.ar/images/loader.gif'
          alt='loader'
          className='h-20 w-20'
        />
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${isSmallScreen ? 'flex-col' : 'flex-row'}`}>
      {/* Sidebar */}
      <div className={`${isSmallScreen ? 'w-full' : 'w-1/4'} ${isSmallScreen ? 'h-auto' : 'h-screen'} p-4`}>
        <ProfilesideBar />
      </div>

      {/* Main Outlet Content */}
      <div className={`${isSmallScreen ? 'w-full' : 'w-3/4'} h-screen p-4 overflow-y-auto scrollbar-hide`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
