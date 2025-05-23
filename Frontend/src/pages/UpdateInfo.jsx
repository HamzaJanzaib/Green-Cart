import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext';

const UpdateInfo = () => {
  const { UserDetails } = useAppContext();
  const [userDetails, setUserDetails] = useState({
    name: UserDetails?.fullname,
    email: UserDetails?.email,
    password: "",
    confirmPassword: "",
  });
  return (
    <div className='p-4'>
      <h1 className='text-lg font-semibold'>Update Information</h1>

      <form className='flex flex-col gap-2 mt-4' onSubmit={(e) => e.preventDefault()}>
        <label className='text-base font-medium block' htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
        />
        <label className='text-base font-medium block' htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
        />
        <label className='text-base font-medium block' htmlFor="Password">Password</label>
        <input
          type="password"
          id="password"
          value={userDetails.password}
          onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
          className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
        />
        <label className='text-base font-medium block' htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={userDetails.confirmPassword}
          onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })}
          className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
        />
        <button type="submit" className='mt-4 bg-primary hover:bg-primary-dull text-white py-2 px-6 rounded w-fit cursor-pointer'>
          Update Info
        </button>
      </form>

    </div>
  )
}

export default UpdateInfo