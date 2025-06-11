import Logo from '../assets/Logo-white.svg';
import Youtube from '../assets/youtube.svg';
import Linkedin from '../assets/linkedin.svg';
import Github from '../assets/github.svg';
import Stripe from '../assets/stripe.svg';
import Fast from '../assets/Fast.svg';
import AmericanPost from '../assets/American-Post.svg';
import EuropeanExpress from '../assets/Europe-Express.svg';
import AirTransportation from '../assets/Air-transportation.svg';

const Footer = () => {
    return (
        <>
        <hr className='mt-18 text-gray-300'/>
        <section className="flex w-full h-[468px] top-[556px] justify-around pt-8">
            <div className="w-[139px] h-[95px] left-[32px] top-[25px]">
                <img src={Logo} className='w-[139px] h-[56px] mb-6'/>
                <div className='flex justify-between'>
                    <img src={Github} className='w-6 h-6'/>
                    <img src={Youtube} className='w-6 h-6'/>
                    <img src={Linkedin} className='w-6 h-6'/>
                </div>
            </div>
            <div className='w-[158px] left-[311px] top-[43px]'>
                <h2 className='mb-8 font-bold'>Customer service</h2>
                <ul className='leading-8'>
                    <li>Shopp Help Center</li>
                    <li>Shopp Mail</li>
                    <li>Purchase/Order Guide</li>
                    <li>Sales Guide</li>
                    <li>Order</li>
                    <li>Returns/Refunds</li>
                    <li>Contact Shopp</li>
                    <li>Warranty Policy</li>
                </ul>
            </div>
            <div className='w-[130px] left-[577px] top-[43px]'>
                <h2 className='mb-8 font-bold'>Shopp</h2>
                <ul className='leading-8'>
                    <li>About</li>
                    <li>Recruitment</li>
                    <li>MIT License</li>
                    <li>Privacy Policy</li>
                    <li>Seller Channel</li>
                    <li>Flash Sale</li>
                    <li>Affiliate Marketing</li>
                    <li>Media Contact</li>
                </ul>
            </div>
            <div className='block'>
                <div className='w-[96px] h-[120px] left-[843px] top-[43px] mb-6'>
                    <h2 className='mb-8 font-bold'>Payment</h2>
                    <img src={Stripe}/>
                </div>
                <div className='w-[179px] h-[139px] left-[843px] top-[183px]'>
                    <h2 className='mb-8 font-bold'>Transportation unit</h2>
                    <div className='flex justify-between mb-5'>
                        <img src={Fast}/>
                        <img src={AirTransportation}/>
                    </div>
                    <div className='flex justify-between'>
                        <img src={AmericanPost}/>
                        <img src={EuropeanExpress}/>
                    </div>
                </div>
            </div>
            <div className='w-[181px] h-[280px] left-[1108px] top-[43px]'>
                <h2 className='mb-8 font-bold'>Developers</h2>
                <h2 className='mb-4 font-bold'>Nghiêm Gia Bảo</h2>
                <div className='flex mb-6'>
                    <img src={Github} className='w-6 h-6 mr-6 ml-4'/>
                    <img src={Linkedin} className='w-6 h-6'/>
                </div>
                <h2 className='mb-4 font-bold'>Matteo Conci</h2>
                <div className='flex mb-8'>
                    <img src={Github} className='w-6 h-6 mr-6 ml-4'/>
                    <img src={Linkedin} className='w-6 h-6'/>
                </div>
                <p className='font-medium text-[12px]'>@This is a fictional website, it is only intended to be used as a portfolio project.</p>
            </div>
        </section>
        </>
    );
};

export default Footer;

