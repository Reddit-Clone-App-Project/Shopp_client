import React from "react";
import { Link } from "react-router-dom";
// SVG
import Bell from "../../assets/HomePage/Header/bell.svg";
import GitHub from "../../assets/HomePage/Header/github-white.svg";
import Search from "../../assets/HomePage/Header/search.svg";
import ShoppingCart from "../../assets/HomePage/Header/shopping-cart.svg";
import Logo from "../../assets/Logo.svg";

const BuyerHeader: React.FC = () => {
  return (
    <div className="bg-purple-500">
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
            <Link to="/register" className="hover:underline">
              Register
            </Link>
            <span>|</span>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
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
  );
};

export default BuyerHeader;
