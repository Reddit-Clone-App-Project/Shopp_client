import OrderManagement from '../../assets/SellerDashboard/OrderManagementLogo.svg';
import OrderOpen from '../../assets/SellerDashboard/OrderOpen.svg';
import ProductManagement from '../../assets/SellerDashboard/ProductManagementLogo.svg';
import Marketing from '../../assets/SellerDashboard/MarketingLogo.svg';
import CustomersService from '../../assets/SellerDashboard/CustomersServiceLogo.svg';
import Financial from '../../assets/SellerDashboard/FinancialLogo.svg';
import Metrics from '../../assets/SellerDashboard/MetricsLogo.svg';
import ShopSettings from '../../assets/SellerDashboard/ShopSettingLogo.svg';
import Tic from '../../assets/SellerDashboard/Tic.svg';
import { useState } from 'react';

const SellerSideBar = () => {
    const [orderIsOpen, setOrderIsOpen] = useState(false);
    const [productIsOpen, setProductIsOpen] = useState(false);
    const [marketingIsOpen, setMarketingIsOpen] = useState(false);
    const [customersIsOpen, setCustomersIsOpen] = useState(false);
    const [financialIsOpen, setFinancialIsOpen] = useState(false);
    const [metricsIsOpen, setMetricsIsOpen] = useState(false);
    const [settingsIsOpen, setSettingsIsOpen] = useState(false);

    return (
        <aside className="fixed bg-black h-full w-85 top-23">
            <nav className="pt-7">
                <ul className="text-white font-light">
                    <div className={`flex items-center m-auto w-65 pl-3 pr-1.5 py-2.5 ${orderIsOpen ? 'bg-[#2e1647] rounded-xl mb-2' : ' mb-4' }`} >
                        <img src={`${orderIsOpen ? OrderOpen : OrderManagement}`} alt="Order Logo" className="mr-5"/>
                        <li>Order Management</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer ${orderIsOpen ? 'rotate-180' : '' }`} onClick={() => setOrderIsOpen(!orderIsOpen)}/>
                    </div>
                    {orderIsOpen &&
                        <div className='flex items-center justify-center'>
                            <ul className='ml-8 space-y-1.5 mb-5'> 
                                    <li>All</li>
                                    <li>Bulk Shipment</li>
                                    <li>Orders Pick Up</li>
                                    <li>Return/Refund or Cancellation Order</li>
                                    <li>Shipping Settings</li>
                            </ul>
                        </div>
                    }
                    <div className="flex items-center m-auto w-65 mb-4">
                        <img src={ProductManagement} alt="Order Logo" className="mr-5"/>
                        <li>Product Management</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer ${productIsOpen ? 'rotate-180' : '' }`} onClick={() => setProductIsOpen(!productIsOpen)}/>
                    </div>
                    <div className="flex items-center m-auto w-65 mb-4">
                        <img src={Marketing} alt="Order Logo" className="mr-5"/>
                        <li>Marketing</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer ${marketingIsOpen ? 'rotate-180' : '' }`} onClick={() => setMarketingIsOpen(!marketingIsOpen)}/>
                    </div>
                    <div className="flex items-center m-auto w-65 mb-4">
                        <img src={CustomersService} alt="Order Logo" className="mr-5"/>
                        <li>Customers Service</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer ${customersIsOpen ? 'rotate-180' : '' }`} onClick={() => setCustomersIsOpen(!customersIsOpen)}/>
                    </div>
                    <div className="flex items-center m-auto w-65 mb-4">
                        <img src={Financial} alt="Order Logo" className="mr-5"/>
                        <li>Financial</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer ${financialIsOpen ? 'rotate-180' : '' }`} onClick={() => setFinancialIsOpen(!financialIsOpen)}/>
                    </div>
                    <div className="flex items-center m-auto w-65 mb-4">
                        <img src={Metrics} alt="Order Logo" className="mr-5"/>
                        <li>Metrics</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer ${metricsIsOpen ? 'rotate-180' : '' }`} onClick={() => setMetricsIsOpen(!metricsIsOpen)}/>
                    </div>
                    <div className="flex items-center m-auto w-65 mb-4">
                        <img src={ShopSettings} alt="Order Logo" className="mr-5"/>
                        <li>Shop Setting</li>
                        <img src={Tic} alt='Toggle' className={`ml-auto hover:cursor-pointer ${settingsIsOpen ? 'rotate-180' : '' }`} onClick={() => setSettingsIsOpen(!settingsIsOpen)}/>
                    </div>
                </ul>
            </nav>
        </aside>
    );
};

export default SellerSideBar;