import React from "react";
// SVG import
import Logo from "../assets/Logo.svg";
import ShopMallLogo from "../assets/sellerLandingPage/shop-mall.svg";
import RightHero from "../assets/sellerLandingPage/right-hero.svg";
import ZeroPercent from "../assets/sellerLandingPage/zero-percentage.svg";
import BullHorn from "../assets/sellerLandingPage/bullhorn.svg";
import DeliveryTruck from "../assets/sellerLandingPage/delivery-truck.svg";
import Basket from "../assets/sellerLandingPage/basket.svg";
import Wrench from "../assets/sellerLandingPage/wrench.svg";
import Shop from "../assets/sellerLandingPage/shop.svg";
// Components import
import Footer from "../components/Footer";
// Dependencies
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SellerLandingPage: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div className="w-full">
      <header className="fixed w-full h-18 flex justify-between items-center p-4 bg-purple-500 shadow-md">
        <img src={Logo} alt="Logo" />
        <div className="flex gap-4">
          <Link to="/login" className="bg-black text-white rounded-lg px-6 py-2 text-xs sm:text-base font-medium hover:bg-gray-800 transition-colors cursor-pointer">
            Login
          </Link>
          <Link to="/register" className="bg-white text-purple-800 rounded-lg px-6 py-2 text-xs sm:text-base font-medium hover:bg-gray-100 transition-colors cursor-pointer">
            Register
          </Link>
        </div>
      </header>
      <div className="pt-24 px-0! md:px-16 lg:px-24">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12 px-10">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Best online e-commerce platform for
              <span className="text-purple-600">selling your product</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Join us today and start selling your products to a global
              audience.
            </p>
            <Link to={ isLoggedIn ? '/new-store' : '/login'} className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors cursor-pointer">
              Start selling now
            </Link>
          </div>
          <div className="flex-1">
            <img
              src={RightHero}
              alt="Right Hero"
              className="w-full h-auto max-w-xl mx-auto"
            />
          </div>
        </div>
        {/* Reason to choose us */}
        <div className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why choose us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <img
                src={ZeroPercent}
                alt="Zero Percent"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Free Registration</h3>
              <p className="text-gray-600">
                Open your shop and selling easily with Shopp!
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <img src={BullHorn} alt="Bull Horn" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Diverse marketing tools
              </h3>
              <p className="text-gray-600">
                Attract buyers and increase orders with Flash Sale, Livestream,
                Buy With Shock Deal,...
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <img
                src={DeliveryTruck}
                alt="Delivery Truck"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Easy transportation
              </h3>
              <p className="text-gray-600">
                Flexibly choose shipping units and track order journey details.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <img src={Basket} alt="Basket" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Super sale with Shopp
              </h3>
              <p className="text-gray-600">
                Breakthrough sales with big campaigns: 9.9 Super Shopping Day,
                11.11 Super Sale,...
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <img src={Wrench} alt="Wrench" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Effective sales support
              </h3>
              <p className="text-gray-600">
                Diverse features to help manage, interact with customers and
                monitor shop performance.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <img src={Shop} alt="Shop" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Connect with the Seller Community
              </h3>
              <p className="text-gray-600">
                Share real-world sales experience through webinars, online
                courses, and support portals.
              </p>
            </div>
          </div>
        </div>
        {/* Step to Get Started */}
        <div className="bg-purple-600 text-white py-16 w-full">
          <div className="container mx-auto px-4 md:px-16 lg:px-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              STEP TO OPEN A SHOP ON SHOPP
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="text-center">
                <h2 className="text-5xl font-bold mb-4">01</h2>
                <h3 className="text-xl font-semibold mb-3">
                  Register Shopp account
                </h3>
                <p className="text-sm text-white/80">
                  On the Shopp page, click Register to create an account. Then,
                  enter your Phone Number and Email on the My Account page to
                  verify your account.
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-5xl font-bold mb-4">02</h2>
                <h3 className="text-xl font-semibold mb-3">Set Up Your Shop</h3>
                <p className="text-sm text-white/80">
                  Go to Seller Center, name your Shop and set up your pickup
                  address.
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-5xl font-bold mb-4">03</h2>
                <h3 className="text-xl font-semibold mb-3">
                  Shipping Settings
                </h3>
                <p className="text-sm text-white/80">
                  Set up shipping method for Shop and click Finish.
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-5xl font-bold mb-4">04</h2>
                <h3 className="text-xl font-semibold mb-3">Start Selling</h3>
                <p className="text-sm text-white/80">
                  Select Add Product, then fill in the details and click Save &
                  Show to complete.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Privileges */}
        <div className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            SELLER PRIVILEGES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
            {/* Shopp Mall */}
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              
              <div className="bg-purple-700 text-white p-5 flex items-center justify-center h-16">
                <img src={ShopMallLogo} alt="Shopp Mall Logo" className="h-7" />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-lg">Shopp Mall</h3>
                <p className="text-gray-600">
                  Premium retail platform for brand owners, authorized
                  distributors or official importers.
                </p>
                <ul className="list-inside space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Enjoy exclusive privileges: guaranteed authenticity,
                      exceptional delivery experience and return policy.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Boost sales with exclusive promotions and campaigns.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Pay Fixed Fee only when a sale is made.</span>
                  </li>
                </ul>
                <Link to={ isLoggedIn ? '/new-store' : '/login'} className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors cursor-pointer">
                  Register now
                </Link>
              </div>
            </div>
            {/* Individual Seller */}
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-purple-400 text-white p-5 flex items-center justify-center h-16">
                <img src={Logo} alt="Shopp Logo" className="h-8" />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-lg">Individual Seller</h3>
                <p className="text-gray-600">
                  For all individuals, businesses, and business households
                </p>
                <ul className="list-inside space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>1-1 Support Specialist for New Sellers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Use specialized marketing tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Flexible choice of shipping unit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Easily manage, interact with customers and monitor shop
                      performance
                    </span>
                  </li>
                </ul>
                <Link to={ isLoggedIn ? '/new-store' : '/login'} className="mt-4 bg-purple-400 text-white px-6 py-2 rounded-md hover:bg-purple-500 transition-colors cursor-pointer">
                  Register now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default SellerLandingPage;
