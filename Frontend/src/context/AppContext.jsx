import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [ShowUserLogin, setShowUserLogin] = useState(false);
    const [Products, setProducts] = useState([]);

    const [CartItems, setCartItems] = useState({});
    const [SearchQuary, setSearchQuary] = useState({});

    // fetching products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    //add to cart
    const addToCart = async (itemId) => {
        let CartData = structuredClone(CartItems)

        if (CartData[itemId]) {
            CartData[itemId] += 1;
        } else {
            CartData[itemId] = 1;
        }
        setCartItems(CartData)
        toast.success("Add To Cart")
    }

    // Updating cart Quantity

    const updateCartsItems = async (itemId, Quantity) => {
        let CartData = structuredClone(CartItems)
        CartData[itemId] = Quantity;
        setCartItems(CartData)
        toast.success("Cart Update")
    }
    // remove products to cart

    const removeFromCart = async (itemId) => {
        let CartData = structuredClone(CartItems)
        if (CartData[itemId]) {
            CartData[itemId] -= 1;
            if (CartData[itemId] === 0) {
                delete CartData[itemId];
            }
        }
        toast.success("Remove FRom Cart")
    }
    useEffect(() => {
        fetchProducts()
    }, [])
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
        setSearchQuary
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
