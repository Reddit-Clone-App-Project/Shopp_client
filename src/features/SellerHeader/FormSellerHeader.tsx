import React from "react";
import SellerLogo from "../../assets/Seller-Logo.svg";
import GenericAvatar from "../../assets/generic-avatar.svg";
import Chat from "../../assets/chat.svg";
import Notification from "../../assets/HomePage/Header/bell.svg";
import Search from "../../assets/HomePage/Header/search.svg";
import Menu from "../../assets/HomePage/Header/hamburger_menu.svg";

const FormSellerHeader = () => {
  return (
    <header className="fixed bg-white/10 backdrop-blur-sm w-full px-4 md:px-6 py-3 flex items-center justify-between z-50">
      {/* Left section - logo and navigation */}
      <div className="flex items-center">
        {/* Mobile menu button - visible only on small screens */}
        <button className="mr-3 lg:hidden">
          <img src={Menu} alt="Menu" className="w-6 h-6" />
        </button>
        
        {/* Logo - kept as your original SVG */}
        <img 
          src={SellerLogo} 
          alt="Seller Logo" 
          className="h-6 w-auto md:h-8"  // Responsive sizing
        />
        
        {/* Breadcrumb - hidden on mobile, visible from md upwards */}
        <div className="ml-4 md:ml-8 text-white text-sm md:text-base hidden md:block">
          Product Management &gt; Add a Product
        </div>
      </div>

      {/* Middle section - search bar */}
      <div className="flex-1 max-w-xl mx-4 hidden md:block lg:mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Type here..."
            className="w-full bg-[#2D2D2D] text-white rounded-lg pl-10 pr-4 py-2 outline-none text-sm md:text-base"
          />
          <img
            src={Search}
            alt="Search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>
      </div>

      {/* Right section - icons */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
        {/* Search icon - mobile only */}
        <button className="p-1 md:hidden">
          <img src={Search} alt="Search" className="w-5 h-5" />
        </button>
        
        {/* Notification icon - hidden on mobile */}
        <button className="p-1 hidden sm:block">
          <img src={Notification} alt="Notifications" className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        {/* Chat icon - hidden on mobile and tablet */}
        <button className="p-1 hidden md:block">
          <img src={Chat} alt="Messages" className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        {/* Profile avatar - always visible */}
        <button className="p-1">
          <img src={GenericAvatar} alt="Profile" className="w-7 h-7 md:w-8 md:h-8" />
        </button>
      </div>
    </header>
  );
};

export default FormSellerHeader;