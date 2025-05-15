import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { loginAdmin } from '../../Services/Auth/AdminLogin';
import toast from 'react-hot-toast';

const AdminLogin = () => {
    const {
        isSeller,
        setIsSeller,
        navigate
    } = useAppContext()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setloading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setloading(true);

            const formdata = {
                email,
                password,
            };

            const data = await loginAdmin(formdata);
            console.log(data);

            if (data.success) {
                toast.success(data.message || "Login successful!");
                setIsSeller(true);
                navigate("/admin");
            } else {
                toast.error(data?.message || "Login failed. Please check your credentials.");
            }

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setloading(false); // Ensures loading stops regardless of success or error
        }
    };


    useEffect(() => {
        if (isSeller) {
            navigate("/admin")
        }
    })

    return !isSeller && (
        <div className="flex h-screen w-full ">
            {/* Left Image Section */}
            <div className="hidden md:block w-1/2">
                <img
                    className="h-full w-full object-cover"
                    src="https://i.pinimg.com/736x/b0/d7/18/b0d718d80001141704d39f6c686caeed.jpg"
                    alt="Admin login background"
                />
            </div>

            {/* Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6">
                <form
                    onSubmit={handleLogin}
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-primary text-center mb-6">
                        Admin Login
                    </h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center text-sm text-gray-600">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <Link to={"/Forgot password"} className="text-sm text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dull transition"
                    >
                        {
                            loading ? <>Loading....</> : <> Login as Admin</>
                        }

                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
