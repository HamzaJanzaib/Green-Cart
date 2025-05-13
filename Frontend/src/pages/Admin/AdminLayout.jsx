import { assets } from "../../assets/assets";
import { PiChatsBold } from "react-icons/pi";
import { MdDashboard, MdAddBusiness } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const AdminLayout = () => {
    const { setIsSeller } = useAppContext();

    const sidebarLinks = [
        { name: "Dashboard", path: "/admin", icon: <MdDashboard /> },
        { name: "Add Products", path: "/admin/Add-Products", icon: <MdAddBusiness /> },
        { name: "Products-list", path: "/admin/Products-list", icon: <FaListCheck /> },
        { name: "Orders", path: "/admin/Orders", icon: <FaBoxOpen /> },
        { name: "Chats", path: "/admin/Chats", icon: <PiChatsBold /> },
        { name: "Setting", path: "/admin/Setting", icon: <IoIosSettings /> },
    ];

    const handleLogout = () => {
        setIsSeller(false);
        // Optionally redirect to login page
    };

    return (
        <>
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to="/admin">
                    <img className="h-9" src={assets.logo} alt="logo" />
                </Link>
                <div className="flex items-center gap-5 text-gray-600">
                    <p>Hi! Admin</p>
                    <button onClick={handleLogout} className="border text-sm px-4 py-1 rounded-full hover:bg-gray-100">
                        Logout
                    </button>
                </div>
            </div>

            {/* Layout Body */}
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <div className="md:w-64 w-16 border-r text-base border-gray-300 pt-4 flex flex-col bg-white">
                    {sidebarLinks.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            className={({ isActive }) =>
                                `flex items-center py-3 px-4 gap-3 transition-colors duration-200
                                ${isActive
                                    ? "border-r-4 md:border-r-[6px] border-primary bg-primary/10 text-primary font-medium"
                                    : "hover:bg-gray-100 text-gray-700"
                                }`
                            }
                        >
                            {item.icon}
                            <span className="hidden md:inline-block">{item.name}</span>
                        </NavLink>
                    ))}
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
