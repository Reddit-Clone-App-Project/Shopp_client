import React from 'react';
// SVG
import Hat from '../../assets/HomePage/Hero/hat.svg';
import Headphone from '../../assets/HomePage/Hero/headphone.svg';
import Products from '../../assets/HomePage/Hero/products.svg';
import TeddyBear from '../../assets/HomePage/Hero/teddy-bear.svg';
// Dependencies
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <div className='bg-black text-white relative flex items-center h-[400px] pl-6 md:pl-11 lg:pl-20 overflow-hidden'>
        <img src={Hat} alt="Hat" className='absolute top-[-100px] left-[-80px] lg:top-[-70px] lg:left-[-20px]'/>
        <img src={Headphone} alt="Headphone" className='absolute top-[-40px] right-[-40px] md:right-[40px] lg:top-[-100px] lg:right-[500px]'/>
        <img src={TeddyBear} alt="Teddy Bear" className='absolute bottom-[-100px] right-[-40px] md:right-[60px] lg:bottom-[-50px] lg:right-[500px]'/>
        <img src={Products} alt="Products" className='absolute right-3 hidden lg:block'/>
        
        
        <div>
            <div>
                <h1 className='text-gray-300 text-3xl sm:text-6xl font-bold'>Black Friday</h1>
                <h1 className='text-white text-3xl sm:text-6xl font-bold mt-1'>Sale up to 
                    <span className='text-purple-500 ml-4'>
                        <TypeAnimation
                        sequence={[
                            '50% off',
                            1000,
                            '70% off',
                            1000,
                            '90% off',
                            1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        />
                    </span>
                </h1>
                <p className='text-gray-300 text-xs font-bold mt-6'>Buy now! The sale will start from 25/11 to 28/11!</p>
            </div>
        </div>        
    </div>
  )
}

export default Hero