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
    const location = useLocation().pathname.split('/');
    const currentPath = location[location.length - 1];

    const { user } = useSelector((state: RootState) => state.profile);


    return (
        <div className="bg-gray-100">
        <header>
            <BuyerHeader />
        </header>

        <div className="pt-[80px] md:pt-[120px] md:px-16 flex gap-6">
            {/* Left Navigation Sidebar */}
            <div className="w-64 flex-shrink-0 bg-white p-6 rounded-lg shadow-sm">
            {/* User Information */}
            <div className="flex gap-2 mb-10">
                <img
                src={user?.profile_img || GenericAvatar}
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
                />
                <div>
                <p className="font-medium">{user?.username}</p>
                <Link
                    to="/me/my-account/profile"
                    className="flex items-center text-blue-700 gap-0.5 text-sm hover:underline"
                >
                    <img src={Edit} alt="Edit" /> Edit Profile
                </Link>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 items-start">
                <div className="w-full">
                <p className="flex items-center gap-2 font-medium mb-2">
                    <img src={Notification} alt="Notifications" /> Notifications
                </p>
                <div className="flex flex-col pl-6 gap-1">
                    <Link
                    to="/me/notification/n-orders"
                    className={`${currentPath === "n-orders" ? "text-blue-600 underline" : "text-gray-600"} hover:text-blue-600 text-sm`}
                    >
                    Orders
                    </Link>
                    <Link
                    to="/me/notification/promotions"
                    className={`${currentPath === "promotions" ? "text-blue-600 underline" : "text-gray-600"} hover:text-blue-600 text-sm`}
                    >
                    Promotions
                    </Link>
                </div>
                </div>

                <div className="w-full">
                <p className="flex items-center gap-2 font-medium mb-2">
                    <img src={MyAccount} alt="My Account" /> My Account
                </p>
                <div className="flex flex-col pl-6 gap-1">
                    <Link
                    to="/me/my-account/profile"
                    className={`${currentPath === "profile" ? "text-blue-600 underline" : "text-gray-600"} hover:text-blue-600 text-sm`}
                    >
                    Profile
                    </Link>
                    <Link
                    to="/me/my-account/address"
                    className={`${currentPath === "address" ? "text-blue-600 underline" : "text-gray-600"} hover:text-blue-600 text-sm`}
                    >
                    Address
                    </Link>
                    <Link
                    to="/me/my-account/change-password"
                    className={`${currentPath === "change-password" ? "text-blue-600 underline" : "text-gray-600"} hover:text-blue-600 text-sm`}
                    >
                    Change Password
                    </Link>
                    <Link
                    to="/me/my-account/notification-settings"
                    className={`${currentPath === "notification-settings" ? "text-blue-600 underline" : "text-gray-600"} hover:text-blue-600 text-sm`}
                    >
                    Notifications Settings
                    </Link>
                    <Link
                    to="/me/my-account/privacy-settings"
                    className={`${currentPath === "privacy-settings" ? "text-blue-600 underline" : "text-gray-600"} hover:text-blue-600 text-sm`}
                    >
                    Privacy Settings
                    </Link>
                </div>
                </div>

                <Link
                to="/me/orders"
                className={`flex items-center gap-2 font-medium ${currentPath === "orders" ? "text-blue-600 underline" : ""} hover:text-blue-600`}
                >
                <img src={Orders} alt="Orders" /> Orders
                </Link>
                <Link
                to="/me/vouchers"
                className={`flex items-center gap-2 font-medium ${currentPath === "vouchers" ? "text-blue-600 underline" : ""} hover:text-blue-600`}
                >
                <img src={Vouchers} alt="Vouchers" /> Vouchers
                </Link>
            </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
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
