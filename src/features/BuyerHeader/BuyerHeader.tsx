import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// SVG
import Bell from "../../assets/HomePage/Header/bell.svg";
import GitHub from "../../assets/HomePage/Header/github-white.svg";
import Search from "../../assets/HomePage/Header/search.svg";
import ShoppingCart from "../../assets/HomePage/Header/shopping-cart.svg";
import Menu from "../../assets/HomePage/Header/hamburger_menu.svg";
import CloseIcon from "../../assets/HomePage/Header/Close.svg";
import Logo from "../../assets/Logo.svg";
import GenericAvatar from "../../assets/generic-avatar.svg";

const BuyerHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { status, error, user } = useSelector((state: RootState) => state.profile); 

  return (
    <div className="bg-purple-500">
      {/* Desktop Header (hidden on mobile) */}
      <div className="hidden md:block">
        {/* Top header */}
        <div className="flex justify-between items-center px-8 pt-2 pb-0.5 text-sm text-white">
          <div className="flex items-center space-x-6">
            <Link to="/seller" className="hover:underline">
              Seller channel
            </Link>
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com/Reddit-Clone-App-Project/Shopp_client"
                target="_blank"
                className="hover:underline"
              >
                Show project Github respository
              </a>
              <img src={GitHub} alt="GitHub" className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <img src={Bell} alt="Notifications" className="w-4 h-4" />
              <span className="hover:underline cursor-pointer">Notification</span>
            </div>
            <div className="flex items-center space-x-4">
              {status !== 'succeeded'? (<><Link to="/register" className="hover:underline">
                Register
              </Link>
              <span>|</span>
              <Link to="/login" className="hover:underline">
                Login
              </Link></>) : <img className="h-8" src={user?.profile_img ?? GenericAvatar} alt="Profile image"/>}
            </div>
          </div>
        </div>

        {/* Bottom header */}
        <div className="flex items-center justify-between px-8 pb-3 pt-1">
          <img src={Logo} alt="Logo" className="h-8 cursor-pointer" />
          <div className="flex-1 max-w-3xl mx-12 relative">
            <input
              type="text"
              placeholder="Free shipping with Shopp - Register now"
              className="w-full h-10 pl-4 pr-10 bg-white focus:outline-none focus:ring-0"
            />
            <div className="absolute w-14 h-6 right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 flex items-center justify-center cursor-pointer hover:bg-purple-700">
              <img src={Search} alt="Search" className="w-4 h-4" />
            </div>
          </div>
          <img
            src={ShoppingCart}
            alt="Shopping Cart"
            className="w-6 h-6 text-white cursor-pointer hover:opacity-80"
          />
        </div>
      </div>

      {/* Mobile Header (shown on mobile) */}
      <div className="md:hidden">
        {/* Top bar with logo, search, cart and menu */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <img 
                src={isMobileMenuOpen ? CloseIcon : Menu} 
                alt="Menu" 
                className="w-6 h-6" 
              />
            </button>
            <img src={Logo} alt="Logo" className="h-6" />
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSearchExpanded(!isSearchExpanded)}>
              <img src={Search} alt="Search" className="w-5 h-5" />
            </button>
            <img 
              src={ShoppingCart} 
              alt="Shopping Cart" 
              className="w-5 h-5" 
            />
          </div>
        </div>

        {/* Expanded search (when search icon is clicked) */}
        {isSearchExpanded && (
          <div className="px-4 pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-4 pr-10 bg-white rounded focus:outline-none"
              />
              <div className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-purple-600 rounded-r">
                <img src={Search} alt="Search" className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu (when hamburger is clicked) */}
        {isMobileMenuOpen && (
          <div className="bg-purple-600 px-4 py-3">
            <div className="space-y-4">
              <Link 
                to="/seller" 
                className="block text-white hover:bg-purple-700 p-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Seller channel
              </Link>
              
              <a
                href="https://github.com/Reddit-Clone-App-Project/Shopp_client"
                target="_blank"
                className="flex items-center space-x-2 text-white hover:bg-purple-700 p-2 rounded"
              >
                <span>GitHub Repository</span>
                <img src={GitHub} alt="GitHub" className="w-4 h-4" />
              </a>

              <div className="flex items-center space-x-2 text-white hover:bg-purple-700 p-2 rounded cursor-pointer">
                <img src={Bell} alt="Notifications" className="w-4 h-4" />
                <span>Notification</span>
              </div>

              <div className="pt-2 border-t border-purple-400">
                {status !== 'succeeded' ? (<>
                  <Link 
                    to="/register" 
                    className="block text-white hover:bg-purple-700 p-2 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                  <Link 
                    to="/login" 
                    className="block text-white hover:bg-purple-700 p-2 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  </>) :  <img className="h-8" src={user?.profile_img ?? GenericAvatar} alt="Profile image"/>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerHeader;