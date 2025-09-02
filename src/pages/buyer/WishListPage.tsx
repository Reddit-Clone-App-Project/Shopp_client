import React from 'react'
import BuyerHeader from '../../features/BuyerHeader/BuyerHeader'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'

const WishListPage = () => {
  return (
    <div className='bg-gray-100'>
        <header>
            <BuyerHeader />
        </header>

        <div className="mt-[56px] md:mt-[92px]">
            <Outlet />
        </div>

        <footer>
            <Footer />
        </footer>
    </div>
  )
}

export default WishListPage