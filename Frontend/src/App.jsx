import React from 'react';
import { Header, Footer, Login } from './Components/Client/Index';
import { ProtectedRoute } from './Components/Admin/index';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import {
  Home,
  AllProducts,
  ProductsCategory,
  ProductsDetails,
  Cart,
  AddAddress,
  MyOrders,
  AdminLogin,
  AdminLayout,
  ErrorPage
} from './pages/Index';

import {
  Dashboard,
  AddProducts,
  Products,
  Orders,
  Setting,
  Chat
} from './pages/Admin/Index';

import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';

const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.includes('admin');
  const { ShowUserLogin, isSeller, loading } = useAppContext();

  // Loader screen blocks the rest of the app
  if (loading) {
    return (
      <>
        <Toaster />
        <div className='flex items-center justify-center h-screen'>
          <img
            src="https://www.movingtree.com.ar/images/loader.gif"
            alt="loader"
            className='h-20 w-20'
          />
        </div>
      </>
    );
  }

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      <Toaster />
      {!isSellerPath && <Header />}
      {ShowUserLogin && <Login />}

      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          {/* Client Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/Products' element={<AllProducts />} />
          <Route path='/Products/:category' element={<ProductsCategory />} />
          <Route path='/Products/:category/:id' element={<ProductsDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/My-Orders' element={<MyOrders />} />
          <Route path='*' element={<ErrorPage />} />

          {/* Admin Routes */}
          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path='Add-Products' element={<AddProducts />} />
            <Route path='Products-list' element={<Products />} />
            <Route path='Orders' element={<Orders />} />
            <Route path='Chats' element={<Chat />} />
            <Route path='Setting' element={<Setting />} />
          </Route>

          {/* Admin Login */}
          <Route
            path='/admin-login'
            element={isSeller ? <Navigate to='/admin' /> : <AdminLogin />}
          />
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
