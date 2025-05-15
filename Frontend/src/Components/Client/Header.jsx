import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from "../../assets/assets";
import { useAppContext } from '../../context/AppContext';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {
        user,
        setUser,
        ShowUserLogin,
        setShowUserLogin,
        isSeller,
        navigate,
        setSearchQuary,
        SearchQuary,
        getCartCount
    } = useAppContext();

    const LogoutUser = () => {
        setUser(null);
        setDropdownOpen(false);
        setOpen(false);
        navigate("/");
    };

    useEffect(() => {
        if (SearchQuary > 0) {
            navigate("/products")
        }
    }, [SearchQuary])

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Contact", path: "/contact" },
        { name: "About", path: "/about" },
    ];

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 z-50 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            {/* Logo */}
            <Link to="/">
                <img className="h-9" src={assets.logo} alt="Logo" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                {navLinks.map((link) => (
                    <Link key={link.path} to={link.path} className="text-gray-900">
                        {link.name}
                    </Link>
                ))}

                {/* Search */}
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        onChange={(e) => setSearchQuary(e.target.value)}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />
                    <img src={assets.search_icon} alt="search_icon" className='w-4 h-4' />
                </div>

                {/* Cart */}
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer group">
                    <div className="flex items-center gap-1 transition-transform hover:scale-105">
                        <img src={assets.cart_icon} alt="cart icon" className='w-6 opacity-80' />
                        <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
                            {getCartCount()}
                        </button>
                    </div>
                </div>

                {/* Auth */}
                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative">
                        <div
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
                        >
                            <img
                                src={assets.profile_icon}
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {dropdownOpen && (
                            <>
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                                    <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                        Profile
                                    </Link>
                                    {isSeller && (
                                        <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                            Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={LogoutUser}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className='flex items-center gap-6'>
                <div className='sm:hidden cursor-pointer flex items-center gap-6'>
                    {/* Cart */}
                    <div onClick={() => navigate("/cart")} className="relative cursor-pointer group">
                        <div className="flex items-center gap-1 transition-transform hover:scale-105">
                            <img src={assets.cart_icon} alt="cart icon" className='w-6 opacity-80' />
                            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
                                {getCartCount()}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden cursor-pointer">
                    <img src={assets.menu_icon} alt="Menu" className='w-6 opacity-80' />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                {navLinks.map((link) => (
                    <Link onClick={() => setOpen(false)} key={link.path} to={link.path} className="text-gray-900 block">
                        {link.name}
                    </Link>
                ))}

                {user && (
                    <Link to="/profile" onClick={() => setOpen(false)} className="text-gray-900 block">
                        Profile
                    </Link>
                )}

                {isSeller && user && (
                    <Link to="/dashboard" onClick={() => setOpen(false)} className="text-gray-900 block">
                        Dashboard
                    </Link>
                )}

                {!user ? (
                    <button
                        onClick={() => {
                            setOpen(false);
                            setShowUserLogin(true);
                        }}
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    <button
                        onClick={LogoutUser}
                        className="cursor-pointer px-8 py-2 bg-red-600 hover:bg-red-700 transition text-white rounded-full"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Header;