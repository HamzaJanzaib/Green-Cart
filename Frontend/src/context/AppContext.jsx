import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user, setUser] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [ShowUserLogin, setShowUserLogin] = useState(false);
    const [Products, setProducts] = useState([]);
    const [CartItems, setCartItems] = useState({});
    const [SearchQuary, setSearchQuary] = useState({});

    // Fetch products on load
    useEffect(() => {
        setProducts(dummyProducts);
    }, []);

    // Load CartItems from localStorage on first render
    useEffect(() => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (error) {
                console.error("Failed to parse cartItems from localStorage", error);
            }
        }
    }, []);

    // Save CartItems to localStorage on every update
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(CartItems));
    }, [CartItems]);

    const addToCart = async (itemId) => {
        const updatedCart = { ...CartItems };
        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
        setCartItems(updatedCart);
        toast.success("Added to cart");
    };

    const updateCartsItems = async (itemId, Quantity) => {
        const updatedCart = { ...CartItems };
        updatedCart[itemId] = Quantity;
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

    const geTCartCount = () => {
        let totalCount = 0;
        for (const item in CartItems) {
            totalCount += CartItems[item];
        }
        return totalCount;
    };

    const getCartTotalAmount = () => {
        let totalAmount = 0;
        for (const itemId in CartItems) {
            const product = Products.find(product => product._id === itemId);
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
        geTCartCount
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
