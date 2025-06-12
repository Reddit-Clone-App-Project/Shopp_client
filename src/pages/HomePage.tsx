import React from 'react'
import Footer from '../components/Footer'
import BuyerHeader from '../features/BuyerHeader/BuyerHeader'
import Hero from '../features/Hero/Hero'

const HomePage : React.FC = () => {
  return (
    <>
        <header>
            <BuyerHeader />
        </header>

        <div>
            <Hero />
            <div>
                
            </div>
        </div>

        <footer>
            <Footer />
        </footer>
    </>
  )
}

export default HomePage