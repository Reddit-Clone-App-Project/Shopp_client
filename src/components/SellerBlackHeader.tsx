import SellerLogo from "../assets/Logo-line.svg";
import GenericAvatar from "../assets/generic-avatar.svg";
import Chat from "../assets/chat.svg";
import Notification from "../assets/HomePage/Header/white-bell.svg";
import Search from "../assets/sellerHeader/light-search.svg";
import Menu from "../assets/HomePage/Header/hamburger_menu.svg";
import portfolio from '../assets/SellerDashboard/user-portfolio.svg';
import settings from '../assets/SellerDashboard/user-settings.svg';
import notification from '../assets/SellerDashboard/user-notifications.svg';
import logoutIcon from '../assets/SellerDashboard/user-logout.svg';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleLogout } from "../features/Auth/AuthSlice";
import { AppDispatch } from "../redux/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
    section: string;
};

const SellerBlackHeader: React.FC<HeaderProps> = ({section}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await dispatch(handleLogout()).unwrap();
      toast.success('Logout successfully!');
      navigate('/home');

    } catch(err){
      toast.error(err as string);
    };
  }; 

  return (
    <>
      <header className="fixed bg-black backdrop-blur-sm w-full px-4 md:px-6 pt-4 py-2 flex items-center justify-between z-50">
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
            className="w-[100%]"
          />
          
          {/* Breadcrumb - hidden on mobile, visible from md upwards */}
        </div>

          <div className="text-white text-2xl ml-20">
            {section}
          </div>

        {/* Middle section - search bar */}
        <div className="flex-1 max-w-xl hidden md:block ml-auto mr-5">
          <div className="flex justify-end">
              <div className="relative">
                  <img
                  src={Search}
                  alt="Search"
                  className="text-[#A6AFD8] absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                  />
                  <input
                  type="text"
                  placeholder='Type here...'
                  className=" text-[#A6AFD8] rounded-2xl pl-10 pr-4 py-2 outline-none text-sm md:text-base border-[#A6AFD8] border-[0.5px]"
                  />
              </div>
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
              <img src={GenericAvatar} alt="Profile" onClick={() => setIsOpen(!isOpen)} className="w-7 h-7 md:w-8 md:h-8 hover:cursor-pointer" />
            </button>
        </div>
      </header>
      <div>
        {isOpen &&
          <div className="flex z-150 absolute justify-end bg-[#2E3A4B] right-5 top-18 py-2 pr-10 pl-2 rounded-lg border">
            <ul className="text-white space-y-4 text-[0.85rem]">
              <div className="flex hover:cursor-pointer">
                <img src={portfolio} alt="portfolio icon" className="mr-4 ml-1"/>
                <li>Shop's portfolio</li>
              </div>
              <div className="flex hover:cursor-pointer">
                <img src={settings} alt="settings icon" className="mr-4 ml-1"/>
                <li>Shop's settings</li>
              </div>
              <div className="flex hover:cursor-pointer">
                <img src={notification} alt="notification icon" className="mr-4 ml-1"/>
                <li>Notifications</li>
              </div>
              <div className="flex hover:cursor-pointer" onClick={logout}>
                <img src={logoutIcon} alt="logout icon" className="mr-4 ml-1"/>
                <li>Logout</li>
              </div>
            </ul>
          </div>
        }
      </div>
    </>
  );
};

export default SellerBlackHeader;