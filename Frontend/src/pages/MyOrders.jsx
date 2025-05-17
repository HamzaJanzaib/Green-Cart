import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';
import { getOrders } from '../Services/Others/GetUserOrders';
import { FaEye } from "react-icons/fa";

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const { currency, navigate } = useAppContext();

    const fetchMyOrders = async () => {
        try {
            const data = await getOrders();
                if (data.success) {
                setMyOrders(data.orders);
            } else {
                toast.error(data.message || "Failed to fetch orders");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch orders");
        }
    }

    useEffect(() => {
        fetchMyOrders()
    }, [])

    return (
        <div className="mt-16 container mx-auto px-4">
            <div className="flex flex-col items-end w-max mb-8">
                <p className="text-2xl font-medium uppercase md:font-bold">My Orders</p>
                <div className="w-16 h-0.5 bg-primary rounded-full" />
            </div>

            {myOrders.length === 0 ? (
                <p className="text-gray-500">You have no orders yet.</p>
            ) : (
                myOrders.map((order, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-lg mb-6 p-5 max-w-4xl w-full"
                    >
                        {/* Order Summary Header */}
                        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-gray-700">
                            <p><span className="font-semibold">Order ID:</span> {order._id}</p>
                            <p><span className="font-semibold">Payment:</span> {order.paymentType}</p>
                            <p><span className="font-semibold">Total:</span> {currency}{order.GrandTotal}</p>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-4">
                            {order.items?.map((item, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t pt-4">
                                    {/* Left: Image + Product Info */}
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-primary/10 p-3 rounded-lg w-16 h-16 flex items-center justify-center relative group">
                                            <img
                                                src={item.product.image[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover rounded"
                                            />
                                            <div className="absolute inset-0 bg-black/20 bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer">
                                                <FaEye className="text-[#F9FAFB] text-lg"
                                                    onClick={() => navigate(`/products/${item.product.category}/${item.product._id}`)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{item.product.name}</p>
                                            <p className="text-sm text-gray-500 capitalize">Category: {item.product.category}</p>

                                        </div>
                                    </div>

                                    {/* Middle: Quantity and Status */}
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>Qty: {item.quantity}</p>
                                        <p>Status: {order.status}</p>
                                        <p><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>

                                    {/* Right: Price */}
                                    <div className="text-primary font-medium">
                                        Amount:{currency} {(item.product.offerPrice * Number(item.quantity)).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default MyOrders
