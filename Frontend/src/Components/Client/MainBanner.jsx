import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
    return (
        <>
            <div className='relative'>
                <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block' />
                <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden' />
            </div>
            <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24 left-0 md:left-20">
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>Freshness You Can Trust , Savings You will Love!</h1>
                <div className='flex items-center mt-6 font-medium'>
                    <Link to="/products" className='group flex items-center gap-2 cursor-pointer px-6 md:px-7 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full w-fit' >
                        Shop Now
                        <img src={assets.white_arrow_icon} alt="arrow" />
                    </Link>
                    <Link to="/products" className='group hidden md:flex items-center gap-2 cursor-pointer px-8 py-2 w-fit' >
                        Explore Deals
                        <img src={assets.black_arrow_icon} alt="arrow" className='transition group-hover:translate-x-1' />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default MainBanner