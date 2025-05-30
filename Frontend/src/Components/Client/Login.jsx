import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { loginUser } from '../../Services/Auth/Login';
import { registerUser } from '../../Services/Auth/Register';

const Login = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setloading] = useState(false);
    const { setShowUserLogin, setUser, navigate } = useAppContext();

    const onSubmithandler = async (e) => {
        e.preventDefault();
        try {
            const formdata = { email, password, ...(state === "register" && { fullname: name }) };
            setloading(true);

            const data = state === "login"
                ? await loginUser(formdata)
                : await registerUser(formdata);

            if (data.success) {
                toast.success(data.message || (state === "login" ? "Login successful!" : "Registration successful!"));

                if (state === "login") {
                    setUser(true);
                    setShowUserLogin(false);
                } else {
                    setState("login");
                }
            } else {
                toast.error(data?.message || `${state === "login" ? "Login" : "Registration"} failed.`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setloading(false);
        }
    };
    return (
        <div onClick={() => setShowUserLogin(false)} className='fixed top-0 bottom-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50 w-full'>
            <form onSubmit={onSubmithandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Register"}
                </p>
                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                    </div>
                )}
                <div className="w-full">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
                </div>
                <div className="flex justify-between items-center w-full">
                    <p className="text-sm">
                        {state === "register" ? (
                            <>Already have an account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">Login</span></>
                        ) : (
                            <>New here? <span onClick={() => setState("register")} className="text-primary cursor-pointer">Register</span></>
                        )}
                    </p>
                    {state === "login" && (
                        <p className="text-sm">
                            <span onClick={() => {
                                navigate('/forgot-password')
                                setShowUserLogin(false);
                            }} className="text-primary cursor-pointer">Forgot Password?</span>
                        </p>
                    )}
                </div>
                <button type="submit" className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {
                        loading ? <>Loading.....</> : <> {state === "register" ? "Create Account" : "Login"}</>
                    }
                </button>
            </form>
        </div>
    );
};

export default Login;
