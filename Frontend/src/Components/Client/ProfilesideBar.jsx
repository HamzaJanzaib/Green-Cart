import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { logoutUser } from '../../Services/Auth/Logout';
import toast from 'react-hot-toast';

const ProfilesideBar = ({ data }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const {
    setUser,
    navigate,
  } = useAppContext();

  const LogoutUser = async () => {
    try {
      const data = await logoutUser();
      if (data.success) {
        setUser(null);
        toast.success(data.message || "Logout successful!");
        navigate("/");
      } else {
        toast.error(data?.message || "Logout failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during logout.");
    }
  };
  const navItemClasses = (path) =>
    `w-4/5 mx-auto py-2 px-4 rounded text-center font-medium transition-colors duration-200 ${isActive(path)
      ? 'bg-primary text-white'
      : 'bg-transparent text-black hover:bg-primary-dull hover:text-white'
    }`;

  return (
    <div className="flex flex-col items-center px-4 py-6">
      {/* Avatar and Name */}
      <img
        className="rounded-full object-cover w-28 h-28 md:w-32 md:h-32"
        src={
          data?.ProfileUrl ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_gIiCoj736HqKkFR0ixF9h-NTvqb2eMd9cw&s'
        }
        alt="Profile"
      />
      <h2 className="mt-4 text-lg md:text-xl font-bold text-center">
        {data?.fullname || 'Guest'}
      </h2>
      <p className="text-sm text-gray-500 text-center">{data?.email}</p>

      {/* Divider */}
      <hr className="w-full border-gray-300 my-4" />

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-2 w-full">
        <Link to="/profile">
          <div className={navItemClasses('/profile')}>Profile Info</div>
        </Link>
        <Link to="/profile/add-address">
          <div className={navItemClasses('/profile/add-address')}>Add Address</div>
        </Link>
        <Link to="/profile/Order-Histry">
          <div className={navItemClasses('/profile/my-orders')}>My Orders</div>
        </Link>
      </div>

      {/* Logout Button */}
      <div className="mt-12 w-full">
        <div
          onClick={LogoutUser}
          className="w-4/5 mx-auto py-2 px-4 bg-red-700 text-white rounded text-center font-medium hover:bg-red-800 transition-colors duration-200 cursor-pointer" >
          Logout
        </div>
      </div>
    </div>
  );
};

export default ProfilesideBar;
