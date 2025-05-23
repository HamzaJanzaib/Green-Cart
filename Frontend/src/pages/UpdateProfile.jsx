import React, { useState } from 'react'
import { useAppContext } from './../context/AppContext';
import { Link, Outlet, useLocation } from 'react-router-dom';

const UpdateProfile = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [selectedImage, setSelectedImage] = useState(null);
  const { UserDetails } = useAppContext();
  const navItemClasses = (path) =>
    `w-4/5 mx-auto py-2 px-4 rounded text-center font-medium transition-colors duration-200 ${isActive(path)
      ? 'bg-primary text-white'
      : 'bg-transparent text-black hover:bg-primary-dull hover:text-white'
    }`;
  return (
    <div className='h-[100%] mt-12'>
      <h1 className='text-2xl text-medium font-bold text-primary'>Update Profile</h1>

      <div className='grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-10 mt-8'>
        <div className=' flex flex-col items-center h-[500px] rounded-lg shadow-lg'>
          <div className='flex flex-col items-center justify-center  mt-10'>
            <h1 className='text-xl font-bold text-black'>Profile Details</h1>
            <p className='text-gray-400'>Upload a new profile picture</p>
            <div className='flex flex-col items-center justify-center my-5'>
              <label htmlFor="avtar" className='flex items-center cursor-pointer gap-2'>
                <input onChange={(e) => setSelectedImage(e.target.files[0])} type="file" id='avtar' hidden accept='image/png, image/jpeg' />
                <img src={selectedImage ? URL.createObjectURL(selectedImage) : UserDetails?.profilePicture} alt="Edit Profile Image" className={`w-12 h-12 ${selectedImage && "rounded-full"}`} />
                <p className='text-sm'>Change Avatar</p>
              </label>
            </div>
            <h1>{UserDetails?.fullname}</h1>
            <p className='text-gray-400 text-xs'>{UserDetails?.email}</p>
          </div>
          <div className="flex flex-col gap-2 mt-5 w-full">
            <Link to="Info">
              <div className={navItemClasses('/profile')}>Update Info</div>
            </Link>
            <Link to="Address">
              <div className={navItemClasses('/profile')}>Update Address</div>
            </Link>
          </div>
          <div className='flex flex-col items-center justify-center mt-10'>
            <button className='bg-primary text-white px-4 py-2 rounded-md mt-5 cursor-pointer'>Update Avatar</button>
          </div>
        </div>
        <div className='h-[500px] rounded-lg shadow-lg overflow-y-auto no-scrolbar '>

          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default UpdateProfile