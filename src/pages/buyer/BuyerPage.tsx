import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import BuyerHeader from "../../features/BuyerHeader/BuyerHeader";
import Footer from "../../components/Footer";

// SVG
import GenericAvatar from "../../assets/generic-avatar.svg";
import Edit from "../../assets/BuyerPortfilioPage/Edit.svg";
import Notification from "../../assets/BuyerPortfilioPage/Notification.svg";
import MyAccount from "../../assets/BuyerPortfilioPage/MyAccount.svg";
import Orders from "../../assets/BuyerPortfilioPage/Orders.svg";
import Vouchers from "../../assets/BuyerPortfilioPage/Vouchers.svg";
import { Link, Outlet, useLocation } from "react-router-dom";

const BuyerPage: React.FC = () => {
  const location = useLocation().pathname.split("/");
  const currentPath = location[location.length - 1];

  const { user } = useSelector((state: RootState) => state.profile);

  return (
    <div className="bg-gray-100">
      <header>
        <BuyerHeader />
      </header>

      <div className="pt-[80px] md:pt-[120px] px-2 sm:px-4 md:px-16 flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left Navigation Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0 bg-white p-4 lg:p-6 rounded-lg shadow-sm">
          {/* User Information */}
          <div className="flex gap-2 mb-6 lg:mb-10">
            <img
              src={user?.profile_img || GenericAvatar}
              alt="User Avatar"
              className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full"
            />
            <div>
              <p className="font-medium text-sm sm:text-base">
                {user?.username}
              </p>
              <Link
                to="/me/my-account/profile"
                className="flex items-center text-blue-700 gap-0.5 text-xs sm:text-sm hover:underline"
              >
                <img src={Edit} alt="Edit" className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4 items-start">
            <div className="w-full">
              <p className="flex items-center gap-2 font-medium mb-2 text-sm sm:text-base">
                <img
                  src={Notification}
                  alt="Notifications"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />{" "}
                Notifications
              </p>
              <div className="flex flex-col pl-4 sm:pl-6 gap-1">
                <Link
                  to="/me/notification/n-orders"
                  className={`${
                    currentPath === "n-orders"
                      ? "text-blue-600 underline"
                      : "text-gray-600"
                  } hover:text-blue-600 text-xs sm:text-sm`}
                >
                  Orders
                </Link>
                <Link
                  to="/me/notification/promotions"
                  className={`${
                    currentPath === "promotions"
                      ? "text-blue-600 underline"
                      : "text-gray-600"
                  } hover:text-blue-600 text-xs sm:text-sm`}
                >
                  Promotions
                </Link>
              </div>
            </div>

            <div className="w-full">
              <p className="flex items-center gap-2 font-medium mb-2 text-sm sm:text-base">
                <img
                  src={MyAccount}
                  alt="My Account"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />{" "}
                My Account
              </p>
              <div className="flex flex-col pl-4 sm:pl-6 gap-1">
                <Link
                  to="/me/my-account/profile"
                  className={`${
                    currentPath === "profile"
                      ? "text-blue-600 underline"
                      : "text-gray-600"
                  } hover:text-blue-600 text-xs sm:text-sm`}
                >
                  Profile
                </Link>
                <Link
                  to="/me/my-account/address"
                  className={`${
                    currentPath === "address"
                      ? "text-blue-600 underline"
                      : "text-gray-600"
                  } hover:text-blue-600 text-xs sm:text-sm`}
                >
                  Address
                </Link>
                <Link
                  to="/me/my-account/change-password"
                  className={`${
                    currentPath === "change-password"
                      ? "text-blue-600 underline"
                      : "text-gray-600"
                  } hover:text-blue-600 text-xs sm:text-sm`}
                >
                  Change Password
                </Link>
                <Link
                  to="/me/my-account/notification-settings"
                  className={`${
                    currentPath === "notification-settings"
                      ? "text-blue-600 underline"
                      : "text-gray-600"
                  } hover:text-blue-600 text-xs sm:text-sm`}
                >
                  Notifications Settings
                </Link>
                <Link
                  to="/me/my-account/privacy-settings"
                  className={`${
                    currentPath === "privacy-settings"
                      ? "text-blue-600 underline"
                      : "text-gray-600"
                  } hover:text-blue-600 text-xs sm:text-sm`}
                >
                  Privacy Settings
                </Link>
              </div>
            </div>

            <Link
              to="/me/orders"
              className={`flex items-center gap-2 font-medium text-sm sm:text-base ${
                currentPath === "orders" ? "text-blue-600 underline" : ""
              } hover:text-blue-600`}
            >
              <img
                src={Orders}
                alt="Orders"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />{" "}
              Orders
            </Link>
            <Link
              to="/me/vouchers"
              className={`flex items-center gap-2 font-medium text-sm sm:text-base ${
                currentPath === "vouchers" ? "text-blue-600 underline" : ""
              } hover:text-blue-600`}
            >
              <img
                src={Vouchers}
                alt="Vouchers"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />{" "}
              Vouchers
            </Link>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
          <Outlet />
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default BuyerPage;
