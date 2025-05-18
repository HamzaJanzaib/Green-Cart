import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../config/config";
import { checkAuthAdmin } from "../Services/Auth/AdminCheck-Auth";
import { checkAuthUser } from "../Services/Auth/Check-user-auth";
import { getProfile } from "../Services/Others/GetProfile";
import { getAddress } from "../Services/Others/GetAllAddress";
import { getallproducts } from "../Services/Others/GetAllProducts";
import { getallcategory } from "../Services/Others/GetAllCategory";
import { updatecart } from "../Services/Others/UpdateCart";
import { getOrders } from "../Services/Others/GetUserOrders";

//eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ShowUserLogin, setShowUserLogin] = useState(false);
    const [Products, setProducts] = useState([]);
    const [Category, setCategory] = useState([]);
    const [CartItems, setCartItems] = useState({});
    const [SearchQuary, setSearchQuary] = useState({});
    const [UserDetails, setUserDetails] = useState({});
    const [userAddress, setuserAddress] = useState({});
    const [AllOrders, setAllOrders] = useState([]);

    const fetchAdmin = async () => {
        try {
            setLoading(true);
            const data = await checkAuthAdmin();
            if (data.success) {
                setIsSeller(true);
                navigate("/admin")
            } else {
                setIsSeller(false);
                navigate("/admin-login");
            }
        } catch {
            setIsSeller(false);
            navigate("/admin-login");
        } finally {
            setLoading(false);
        }
    };
    const getUserProfile = async () => {
        try {
            setLoading(true);

            const data = await getProfile();

            if (data?.success) {
                setUserDetails(data.data);
                if (data.data.role === "admin") {
                    setIsSeller(true);
                }
            } else {
                toast.error(data.message || "Failed to fetch user profile");
            }

        } catch (error) {
            console.error("getUserProfile error:", error);
            setIsSeller(false);
        } finally {
            setLoading(false);
        }
    };
    const getUserAddress = async () => {
        try {
            setLoading(true);

            const data = await getAddress();

            if (data?.success) {
                setuserAddress(data.data[0]);
                if (data.data.role === "admin") {
                    setIsSeller(true);
                }
            } else {
                toast.error(data.message || "Failed to fetch user profile");
            }

        } catch (error) {
            console.error("getUserProfile error:", error);
            setIsSeller(false);
        } finally {
            setLoading(false);
        }
    };
    const getAllProducts = async () => {
        try {
            const data = await getallproducts();
            if (data?.success) {
                setProducts(data.data);
            } else {
                toast.error(data.message || "Failed to fetch user profile");
            }

        } catch (error) {
            console.error("getUserProfile error:", error);
            setIsSeller(false);
        }
    };
    const getAllCategories = async () => {
        try {
            const data = await getallcategory();
            if (data?.success) {
                setCategory(data.data);
            } else {
                toast.error(data.message || "Failed to fetch user profile");
            }

        } catch (error) {
            console.error("getUserProfile error:", error);
        }
    };
    const fetchUser = async () => {
        try {
            setLoading(true);
            const data = await checkAuthUser();
            if (data.success) {
                setCartItems(data.data.cartItems);
                if (!user) {
                    setUser(true);
                }
            } else {
                if (user) {
                    toast.error(data.message || "User not authorized");
                }
                setUser(false);
            }
        } catch (error) {
            console.error(error);
            setUser(false);
        } finally {
            setLoading(false);
        }
    };

    const GetAllOrders = async () => {
        try {
            const data = await getOrders();
            if (data?.success) {
                setAllOrders(data.orders);
            } else {
                toast.error(data.message || "Failed to fetch user profile");
            }

        } catch (error) {
            console.error("getUserProfile error:", error);
        }
    };

    useEffect(() => {
        fetchUser();
        getAllCategories();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        getAllProducts();
    }, [Products]);

    useEffect(() => {
        if (user) {
            getUserProfile();
            getUserAddress();
        }
    }, [user])
    useEffect(() => {
        if (location.pathname.includes("/admin")) {
            fetchAdmin();
            GetAllOrders();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const updateDBCartItems = async () => {
            try {
                const data = await updatecart(CartItems);
                if (!data.success) {
                    // setCartItems(data.data.cartItems);
                    return toast.error(data.message || "Cart not updated");
                }
            } catch (error) {
                toast.error(error.message);
            }
        };
        if (user) {
            updateDBCartItems();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CartItems])

    // Local storage for cart items has been removed

    const addToCart = async (itemId) => {
        const updatedCart = { ...CartItems };
        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
        setCartItems(updatedCart);
        toast.success("Added to cart");
    };

    const updateCartsItems = async (itemId, quantity) => {
        const updatedCart = { ...CartItems };
        updatedCart[itemId] = quantity;
        setCartItems(updatedCart);
        toast.success("Cart updated");
    };

    const removeFromCart = async (itemId) => {
        const updatedCart = { ...CartItems };
        if (updatedCart[itemId]) {
            updatedCart[itemId] -= 1;
            if (updatedCart[itemId] === 0) delete updatedCart[itemId];
            setCartItems(updatedCart);
            toast.success("Removed from cart");
        }
    };

    const getCartCount = () => {
        return Object.values(CartItems).reduce((acc, curr) => acc + curr, 0);
    };

    const getCartTotalAmount = () => {
        let totalAmount = 0;
        for (const itemId in CartItems) {
            const product = Products.find(p => p._id === itemId);
            if (product) {
                totalAmount += product.offerPrice * CartItems[itemId];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    const value = {
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        ShowUserLogin,
        setShowUserLogin,
        Products,
        currency,
        addToCart,
        updateCartsItems,
        removeFromCart,
        CartItems,
        SearchQuary,
        setSearchQuary,
        getCartTotalAmount,
        getCartCount,
        BASE_URL,
        loading,
        UserDetails,
        userAddress,
        Category,
        getAllProducts,
        setCartItems,
        AllOrders,
        getUserProfile
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

//eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
