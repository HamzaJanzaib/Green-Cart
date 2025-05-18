import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { VerifactionMode } from '../Components/Admin';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { setShowUserLogin } = useAppContext();

  const handleLoginClick = () => {
    navigate('/');
    setShowUserLogin(true);
  };

  return (
    <>
    <div className="flex items-center justify-center h-screen">
    <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Forget Password?</h2>
      <label htmlFor="email">Email</label>
      <input id="email" className="w-full border mt-1 border-gray-500/30 focus:border-primary outline-none rounded py-2.5 px-4" type="email" placeholder="Enter your email" />
      <button type="button" onClick={() => navigate('/verify-code')} className="w-full cursor-pointer my-3 bg-primary hover:bg-primary-dull active:scale-95 transition py-2.5 rounded text-white">Send Email</button>
      <p className="text-center mt-4">Remember your password? <span className="text-primary underline cursor-pointer" onClick={handleLoginClick}>Login</span></p>
    </div> 
    </div> 
    </>
  )
}

export default ForgetPassword