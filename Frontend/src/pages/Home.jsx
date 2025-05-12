import React from 'react'
import { MainBanner, Categories, BestSeller , BottumBanner , NewsLetter } from '../Components/Client/Index'

const Home = () => {
    return (
        <div className='mt-10'>
            <MainBanner />
            <Categories />
            <BestSeller />
            <BottumBanner />
            <NewsLetter />
        </div>
    )
}

export default Home