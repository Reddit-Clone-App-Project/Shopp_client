import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNotificationSettings } from "../features/UserProfile/UserProfileSlice";
import ToggleSwitch from "./ToggleSwitch";

const BuyerNotificationSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state: any) => state.profile);

  // Local state for notification settings
  const [emailNotification, setEmailNotification] = useState<boolean>(false);
  const [orderUpdate, setOrderUpdate] = useState<boolean>(false);
  const [promotionUpdate, setPromotionUpdate] = useState<boolean>(false);

  // Initialize state with user data when available
  useEffect(() => {
    if (user) {
      setEmailNotification(user.email_notification || false);
      setOrderUpdate(user.order_update || false);
      setPromotionUpdate(user.promotion_update || false);
    }
  }, [user]);

  const handleSave = () => {
    const settings = {
      email_notification: emailNotification,
      order_update: orderUpdate,
      promotion_update: promotionUpdate,
    };

    dispatch(changeNotificationSettings(settings) as any);
  };

  const isLoading = status === "loading";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Notification Settings
      </h2>

      <div className="space-y-6">
        {/* Email Notification */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">
              Email Notifications
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Receive general notifications and updates via email
            </p>
          </div>
          <ToggleSwitch
            value={emailNotification}
            onChange={setEmailNotification}
          />
        </div>

        {/* Order Updates */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">Order Updates</h3>
            <p className="text-sm text-gray-600 mt-1">
              Get notified about order status changes and delivery updates
            </p>
          </div>
          <ToggleSwitch value={orderUpdate} onChange={setOrderUpdate} />
        </div>

        {/* Promotions */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">Promotions</h3>
            <p className="text-sm text-gray-600 mt-1">
              Receive notifications about sales, discounts, and special offers
            </p>
          </div>
          <ToggleSwitch value={promotionUpdate} onChange={setPromotionUpdate} />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Success/Error Message */}
      {status === "succeeded" && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          Notification settings updated successfully!
        </div>
      )}

      {status === "failed" && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          Failed to update notification settings. Please try again.
        </div>
      )}
    </div>
  );
};

export default BuyerNotificationSettings;
