import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';
import { getAddress } from '../Services/Others/GetAllAddress';
import { placeOrderByCOD } from './../Services/Others/PlaceOrderCOD';

const Cart = () => {
  const {
    Products,
    currency,
    updateCartsItems,
    removeFromCart,
    CartItems,
    navigate,
    getCartTotalAmount,
    getCartCount,
    user,
    setCartItems
  } = useAppContext();

  const [Address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [cartArray, setCartArray] = useState([]);
  const [SelectedAddress, setSelectedAddress] = useState(null);
  const [PaymentOption, setPaymentOption] = useState('COD');

  const getCart = () => {
    let tempArray = [];
    for (const key in CartItems) {
      const product = Products.find((item) => item._id === key);
      if (product) {
        product.quantity = CartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };


  const getUserAddress = async () => {
    try {
      const data = await getAddress();
      console.log(data);
      if (data.success) {
        setAddress(data.data);
        setSelectedAddress(data.data[0]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("getUserAddress error:", error);
      toast.error("Failed to fetch address. Please try again.");
    }
  };

  const placeOrder = async () => {
    if (!SelectedAddress) {
      return toast.error("Please select an address.");
    }
    try {
      const orderData = {
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          amount: item.offerPrice * item.quantity,
        })),
        address: SelectedAddress._id,
      };
      if (PaymentOption === 'COD') {
        const data = await placeOrderByCOD(orderData);
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate('/profile/Order-Histry ');
        } else {
          toast.error(data.message);
        }
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (Products.length > 0 && CartItems) {
      getCart();
    }
    getUserAddress();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Products, CartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return Products.length > 0 && CartItems ? (
    <div className="flex flex-col md:flex-row mt-24">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>Weight: <span>{product.weight || 'N/A'}</span></p>
                  <div className='flex items-center'>
                    <p>Qty:</p>
                    <select
                      onChange={(e) => updateCartsItems(product._id, Number(e.target.value))}
                      value={CartItems[product._id]}
                      className='outline-none'
                    >
                      {Array.from({ length: Math.max(CartItems[product._id], 9) }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-center">{currency}{(product.offerPrice * product.quantity).toFixed(2)}</span>
            <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto">
              <img src={assets.remove_icon} alt="remove" className='inline-block w-6 h-6' />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate('/products');
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img src={assets.arrow_right_icon_colored} alt="arrow" className='group-hover:-translate-x-1 transition' />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {SelectedAddress ? `${SelectedAddress.street}, ${SelectedAddress.city}, ${SelectedAddress.state}, ${SelectedAddress.country}` : 'No address found'}
            </p>
            <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {Address.map((addr, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setShowAddress(false);
                      setSelectedAddress(addr);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {addr.street}, {addr.city}, {addr.state}, {addr.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate('/profile/add-address')}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
        <select
          onChange={(e) => setPaymentOption(e.target.value)}
          className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <hr className="border-gray-300 my-5" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>{currency}{getCartTotalAmount().toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency}{(getCartTotalAmount() * 0.02).toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>{currency}{(getCartTotalAmount() * 1.02).toFixed(2)}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
        >
          {PaymentOption === 'COD' ? 'Place Order' : 'Proceed To Checkout'}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;