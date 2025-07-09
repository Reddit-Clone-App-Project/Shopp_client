import OrderManagement from '../../assets/SellerDashboard/OrderManagementLogo.svg';
import OpenOrder from '../../assets/SellerDashboard/OrderOpen.svg';
import ProductManagement from '../../assets/SellerDashboard/ProductManagementLogo.svg';
import OpenProduct from '../../assets/SellerDashboard/OpenProduct.svg';
import Marketing from '../../assets/SellerDashboard/MarketingLogo.svg';
import OpenMarketing from '../../assets/SellerDashboard/OpenMarketing.svg';
import CustomersService from '../../assets/SellerDashboard/CustomersServiceLogo.svg';
import OpenServices from '../../assets/SellerDashboard/OpenServices.svg';
import Financial from '../../assets/SellerDashboard/FinancialLogo.svg';
import OpenFinancial from '../../assets/SellerDashboard/OpenFinancial.svg';
import Metrics from '../../assets/SellerDashboard/MetricsLogo.svg';
import OpenMetrics from '../../assets/SellerDashboard/OpenMetrics.svg';
import ShopSettings from '../../assets/SellerDashboard/ShopSettingLogo.svg';
import OpenSettings from '../../assets/SellerDashboard/OpenSettings.svg';
import Tic from '../../assets/SellerDashboard/Tic.svg';
import Documentation from '../../assets/SellerDashboard/Documentation.svg';
import { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';



const SellerSideBar = () => {
    const [orderIsOpen, setOrderIsOpen] = useState(false);
    const [productIsOpen, setProductIsOpen] = useState(false);
    const [marketingIsOpen, setMarketingIsOpen] = useState(false);
    const [customersIsOpen, setCustomersIsOpen] = useState(false);
    const [financialIsOpen, setFinancialIsOpen] = useState(false);
    const [metricsIsOpen, setMetricsIsOpen] = useState(false);
    const [settingsIsOpen, setSettingsIsOpen] = useState(false);
    const navigate = useNavigate();
    


    return (
        <aside className="bg-black h-screen w-85 mt-18">
            <nav className="pt-7">
                <ul className="text-white font-light">
                    <div className={`flex items-center m-auto w-68 pl-3.5 pr-1.5 py-2.5 transition-all duration-300 ${orderIsOpen ? 'bg-[#2e1647] rounded-xl mb-2' : ' mb-4' }`} >
                        <img src={`${orderIsOpen ? OpenOrder : OrderManagement}`} alt="Order Logo" className="mr-5"/>
                        <li>Order Management</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer transition-transform duration-300 ${orderIsOpen ? 'rotate-180' : '' }`} onClick={() => setOrderIsOpen(!orderIsOpen)}/>
                    </div>
                    <AnimatePresence initial={false}>
                    {orderIsOpen &&
                        <motion.div className='flex items-center justify-center' 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <ul className='ml-6 space-y-1.5 mb-5'> 
                                    <li className='hover:cursor-pointer'>All</li>
                                    <li className='hover:cursor-pointer'>Bulk Shipment</li>
                                    <li className='hover:cursor-pointer'>Orders Pick Up</li>
                                    <li className='hover:cursor-pointer'>Return/Refund or Cancellation Order</li>
                                    <li className='hover:cursor-pointer'>Shipping Settings</li>
                            </ul>
                        </motion.div>
                    }
                    </AnimatePresence>
                    <div className={`flex items-center m-auto w-68 pl-3.5 pr-1.5 py-2.5 transition-all duration-300 ${productIsOpen ? 'bg-[#2e1647] rounded-xl mb-2' : ' mb-4' }`} >
                        <img src={`${productIsOpen ? OpenProduct : ProductManagement}`} alt="Product Logo" className="mr-5"/>
                        <li>Product Management</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer transition-transform duration-300 ${productIsOpen ? 'rotate-180' : '' }`} onClick={() => setProductIsOpen(!productIsOpen)}/>
                    </div>
                    <AnimatePresence initial={false}>
                    {productIsOpen &&
                        <motion.div className='flex items-center' 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <ul className='ml-12 space-y-1.5 mb-5'> 
                                    <li className='hover:cursor-pointer'>All Products</li>
                                    <li className='hover:cursor-pointer'><a href="/seller/create">Add Products</a></li>
                            </ul>
                        </motion.div>
                    }
                    </AnimatePresence>
                    <div className={`flex items-center m-auto w-68 pl-3.5 pr-1.5 py-2.5 transition-all duration-300 ${marketingIsOpen ? 'bg-[#2e1647] rounded-xl mb-2' : ' mb-4' }`} >
                        <img src={`${marketingIsOpen ? OpenMarketing : Marketing}`} alt="Marketing Logo" className="mr-5"/>
                        <li>Marketing</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer transition-transform duration-300 ${marketingIsOpen ? 'rotate-180' : '' }`} onClick={() => setMarketingIsOpen(!marketingIsOpen)}/>
                    </div>
                    <AnimatePresence initial={false}>
                    {marketingIsOpen &&
                        <motion.div className='flex items-center' 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <ul className='ml-12 space-y-1.5 mb-5'> 
                                    <li className='hover:cursor-pointer'>Marketing Channel</li>
                                    <li className='hover:cursor-pointer'>Shopp Advertisement</li>
                                    <li className='hover:cursor-pointer'>Shop's Promotion</li>
                                    <li className='hover:cursor-pointer'>Shop's Flash Sale</li>
                                    <li className='hover:cursor-pointer'>Shop's Voucher</li>
                                    <li className='hover:cursor-pointer'>Shopp Event</li>
                            </ul>
                        </motion.div>
                    }
                    </AnimatePresence>
                    <div className={`flex items-center m-auto w-68 pl-3.5 pr-1.5 py-2.5 transition-all duration-300 ${customersIsOpen ? 'bg-[#2e1647] rounded-xl mb-2' : ' mb-4' }`} >
                        <img src={`${customersIsOpen ? OpenServices : CustomersService}`} alt="Customers Logo" className="mr-5"/>
                        <li>Customers Service</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer transition-transform duration-300 ${customersIsOpen ? 'rotate-180' : '' }`} onClick={() => setCustomersIsOpen(!customersIsOpen)}/>
                    </div>
                    <AnimatePresence initial={false}>
                    {customersIsOpen &&
                        <motion.div className='flex items-center' 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <ul className='ml-12 space-y-1.5 mb-5'> 
                                    <li className='hover:cursor-pointer'>Chat Management</li>
                                    <li className='hover:cursor-pointer'>Ratings Management</li>
                            </ul>
                        </motion.div>
                    }
                    </AnimatePresence>
                    <div className={`flex items-center m-auto w-68 pl-3.5 pr-1.5 py-2.5 transition-all duration-300 ${financialIsOpen ? 'bg-[#2e1647] rounded-xl mb-2' : ' mb-4' }`} >
                        <img src={`${financialIsOpen ? OpenFinancial : Financial}`} alt="Financial Logo" className="mr-5"/>
                        <li>Financial</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer transition-transform duration-300 ${financialIsOpen ? 'rotate-180' : '' }`} onClick={() => setFinancialIsOpen(!financialIsOpen)}/>
                    </div>
                    <AnimatePresence initial={false}>
                    {financialIsOpen &&
                        <motion.div className='flex items-center' 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <ul className='ml-12 space-y-1.5 mb-5'> 
                                    <li className='hover:cursor-pointer'>Revenue</li>
                                    <li className='hover:cursor-pointer'>Account Balance</li>
                                    <li className='hover:cursor-pointer'>Bank Account</li>
                            </ul>
                        </motion.div>
                    }
                    </AnimatePresence>
                    <div className={`flex items-center m-auto w-68 pl-3.5 pr-1.5 py-2.5 transition-all duration-300 ${metricsIsOpen ? 'bg-[#2e1647] rounded-xl mb-2' : ' mb-4' }`} >
                        <img src={`${metricsIsOpen ? OpenMetrics : Metrics}`} alt="Metrics Logo" className="mr-5"/>
                        <li>Metrics</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer transition-transform duration-300 ${metricsIsOpen ? 'rotate-180' : '' }`} onClick={() => setMetricsIsOpen(!metricsIsOpen)}/>
                    </div>
                    <AnimatePresence initial={false}>
                    {metricsIsOpen &&
                        <motion.div className='flex items-center' 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <ul className='ml-12 space-y-1.5 mb-5'> 
                                    <li className='hover:cursor-pointer'>Sales Analysis</li>
                                    <li className='hover:cursor-pointer'>Operation Efficiency</li>
                            </ul>
                        </motion.div>
                    }
                    </AnimatePresence>
                    <div className={`flex items-center m-auto w-68 pl-3.5 pr-1.5 py-2.5 transition-all duration-300 ${settingsIsOpen ? 'bg-[#2e1647] rounded-xl mb-2' : ' mb-4' }`} >
                        <img src={`${settingsIsOpen ? OpenSettings : ShopSettings}`} alt="Settings Logo" className="mr-5"/>
                        <li>Shop Setting</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer transition-transform duration-300 ${settingsIsOpen ? 'rotate-180' : '' }`} onClick={() => setSettingsIsOpen(!settingsIsOpen)}/>
                    </div>
                    <AnimatePresence initial={false}>
                    {settingsIsOpen &&
                        <motion.div className='flex items-center' 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <ul className='ml-12 space-y-1.5 mb-5'> 
                                    <li className='hover:cursor-pointer'>Shop's Profile</li>
                                    <li className='hover:cursor-pointer'>Decorate Shop</li>
                                    <li className='hover:cursor-pointer'>Shop's Settings</li>
                            </ul>
                        </motion.div>
                    }
                    </AnimatePresence>
                </ul>
                <img src={Documentation} onClick={() => navigate('/documentation')} alt='documentation' className='m-auto mt-40 hover:cursor-pointer'/>
            </nav>
        </aside>
    );
};

export default SellerSideBar;