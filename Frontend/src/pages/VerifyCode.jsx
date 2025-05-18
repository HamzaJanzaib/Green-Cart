import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyCode = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="bg-white text-gray-500 relative flex items-center flex-col max-w-96 mx-4 md:px-8 md:py-10 p-6 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10 transition-all">
                <img className="h-16 w-16 absolute -top-8" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/otp/privacyIcon.png" alt="privacyIcon" />
                <h2 className="text-2xl font-semibold mb-2 text-center text-primary mt-6">Forgot Your Password?</h2>
                <p className="mb-6 text-center">Please enter the verification code sent to your email</p>

                <div className="flex items-center justify-between mb-6 w-full">
                    <input className="otp-input w-10 h-10 border border-gray-300 outline-none rounded text-center text-lg focus:border-indigo-500 transition duration-300"
                        type="text" maxLength="1" required />
                    <input className="otp-input w-10 h-10 border border-gray-300 outline-none rounded text-center text-lg focus:border-indigo-500 transition duration-300"
                        type="text" maxLength="1" required />
                    <input className="otp-input w-10 h-10 border border-gray-300 outline-none rounded text-center text-lg focus:border-indigo-500 transition duration-300"
                        type="text" maxLength="1" required />
                    <input className="otp-input w-10 h-10 border border-gray-300 outline-none rounded text-center text-lg focus:border-indigo-500 transition duration-300"
                        type="text" maxLength="1" required />
                    <input className="otp-input w-10 h-10 border border-gray-300 outline-none rounded text-center text-lg focus:border-indigo-500 transition duration-300"
                        type="text" maxLength="1" required />
                    <input className="otp-input w-10 h-10 border border-gray-300 outline-none rounded text-center text-lg focus:border-indigo-500 transition duration-300"
                        type="text" maxLength="1" required />
                </div>

                <div className="flex items-center w-full gap-2 my-2">
                    <label class="flex gap-3 items-center cursor-pointer">
                        <input type="checkbox" class="hidden peer" />
                        <span class="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary">
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z" fill="#F5F7FF" stroke="#F5F7FF" stroke-width=".4" />
                            </svg>
                        </span>
                        <span class="text-gray-700 select-none"> Remember this device</span>
                    </label>
                </div>

                <button onClick={() => navigate('/')} type="submit" className="w-full cursor-pointer mt-2 bg-primary py-2.5 rounded-lg text-white font-semibold hover:bg-primary-dull transition duration-300">
                    Verify Code
                </button>
            </form>
        </div>
    );
};

export default VerifyCode;

