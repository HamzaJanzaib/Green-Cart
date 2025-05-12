import React from 'react'
import { Header, Footer, Login } from './Components/Client/Index'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home, AllProducts, ProductsCategory, ProductsDetails, Cart, AddAddress } from './pages/Index'
import { Toaster } from "react-hot-toast"
import { useAppContext } from './context/AppContext'


const App = () => {
  const isSellerPath = useLocation().pathname.includes("admin")
  const { ShowUserLogin } = useAppContext()
  return (
    <div>
      {isSellerPath ? null : <Header />}
      {ShowUserLogin ? <Login /> : null}

      <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Products' element={<AllProducts />} />
          <Route path='/Products/:category' element={<ProductsCategory />} />
          <Route path='/Products/:category/:id' element={<ProductsDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App