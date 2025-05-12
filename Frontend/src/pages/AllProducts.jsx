import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../Components/Client/ProductCard';

const AllProducts = () => {
  const { Products, SearchQuary } = useAppContext();
  const [FilterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    if (SearchQuary.length > 0) {
      setFilterProducts(Products.filter(product => 
        product.name.toLowerCase().includes(SearchQuary.toLowerCase())
      ));
    } else {
      setFilterProducts(Products);
    }
  }, [Products, SearchQuary]);

  return (
    <div className='mt-16 flex flex-col container mx-auto px-4'>
      <div className='flex flex-col items-end w-max mb-8' >
        <p className='text-2xl font-medium uppercase md:font-bold'>All Products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full' />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-6'>
        {FilterProducts
          .filter(product => product.inStock)
          .map((product) => (
            <ProductCard key={product._id} Product={product} />
          ))
        }
      </div>
    </div>
  );
};

export default AllProducts;