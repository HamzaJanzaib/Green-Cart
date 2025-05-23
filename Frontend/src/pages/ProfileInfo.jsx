import React from 'react';
import { useAppContext } from './../context/AppContext';

const ProfileInfo = () => {
  const {
    getCartCount,
    UserDetails,
    userAddress,
    navigate,
    UserOrders
  } = useAppContext();

  console.log(UserOrders)

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-primary uppercase">profile Information</h1>
        <p className="text-gray-500 text-sm">Manage your account details</p>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-600 font-medium">Full Name</p>
          <p className="text-gray-800">{UserDetails?.fullname || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Email</p>
          <p className="text-gray-800">{UserDetails?.email || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Role</p>
          <p className="text-gray-800 capitalize">{UserDetails?.role || 'user'}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Phone Number</p>
          <p className="text-gray-800">{userAddress[0]?.phoneNumber || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Total Orders</p>
          <p className="text-gray-800">{UserOrders.length || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Cart Items</p>
          <p className="text-gray-800">{getCartCount()}</p>
        </div>
      </div>

      {/* Address Section */}
      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Address Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">First Name</p>
            <p className="text-gray-800">{userAddress[0]?.firstName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Last Name</p>
            <p className="text-gray-800">{userAddress[0]?.lastName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Street</p>
            <p className="text-gray-800">{userAddress[0]?.street || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">City</p>
            <p className="text-gray-800">{userAddress[0]?.city || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">State</p>
            <p className="text-gray-800">{userAddress[0]?.state || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Zip Code</p>
            <p className="text-gray-800">{userAddress[0]?.zipcode || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Country</p>
            <p className="text-gray-800">{userAddress[0]?.country || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Phone</p>
            <p className="text-gray-800">{userAddress[0]?.phoneNumber || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-end">
        <button
          onClick={() => navigate('/update-profile')}
          className="bg-primary text-white px-6 py-2 rounded cursor-pointer hover:bg-primary-dull transition duration-200">
          Edit Profile
        </button>
        <button onClick={() => navigate('/forgot-password')} className="bg-white text-primary cursor-pointer px-6 py-2 rounded transition duration-200">
          Forget Password
        </button>
      </div>

    <div>
      
    </div>

    </div>



  );
};

export default ProfileInfo;
