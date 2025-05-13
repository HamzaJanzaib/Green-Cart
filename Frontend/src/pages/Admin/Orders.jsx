import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';
import { assets, dummyOrders } from '../../assets/assets';

const Orders = () => {
  const { currency } = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    setOrders(dummyOrders)
  }

  useEffect(() => {
    fetchOrders()
  } , [])

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="no-scrolbar py-10 flex-1 h-[95vh] flex overflow-y-scroll flex-col justify-between bg-[#F9FAFB]">
    <div className="md:p-10 p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold uppercase">All Orders</h1>
        <div className="w-16 h-0.5 bg-primary mt-2 rounded-full" />
      </header>

      {orders.map((order) => (
        <article
          key={order.id}
          className="flex flex-col md:grid md:grid-cols-[3fr_2fr_1fr_2fr_1fr] items-start md:items-center gap-5 p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
        >
          <div className="flex gap-4 items-start">
            <img src={assets.box_icon} alt="Box Icon" className="w-12 h-12 opacity-70" />
            <div>
              {order.items.map((item, index) => (
                <p key={index} className="font-medium text-gray-800">
                  {item.product.name}
                  {item.quantity > 1 && (
                    <span className="text-primary"> × {item.quantity}</span>
                  )}
                </p>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
            <p>{order.address.street}, {order.address.city}, {order.address.state} {order.address.zipcode}, {order.address.country}</p>
          </div>

          <p className="font-semibold text-gray-900">{currency}{order.amount.toFixed(2)}</p>

          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Method:</span> {order.paymentType}</p>
            <p><span className="font-medium">Date:</span> {order.orderDate}</p>
            <p>
              <span className="font-medium">Payment:</span>{' '}
              <span className={`font-semibold ${order.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                {order.isPaid ? 'Paid' : 'Pending'}
              </span>
            </p>
          </div>

          <div className="flex gap-3 text-xl text-gray-600">
            <button className="hover:text-primary transition cursor-pointer" title="Edit">
              <FaEdit />
            </button>
            <button className="hover:text-red-600 transition  cursor-pointer" title="View">
              <FaEye />
            </button>
          </div>
        </article>
      ))}
    </div>
    </div>
  );
};

export default Orders;
