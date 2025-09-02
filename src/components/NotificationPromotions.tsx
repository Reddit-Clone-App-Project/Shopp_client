import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  markSingleNotificationAsRead,
  deleteANotification,
} from "../features/Notification/NotificationSlice";
import { toast } from "react-toastify";

// SVG
import TrashIcon from "../assets/trash.svg";

const NotificationPromotions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, status } = useSelector(
    (state: RootState) => state.notification
  );

  // Filter notifications to show only promotion-related ones
  const promotionNotifications = useMemo(() => {
    return notifications.filter(
      (notification) =>
        notification.type === "promotion" ||
        notification.type === "discount" ||
        notification.type === "sale" ||
        notification.content.toLowerCase().includes("promotion") ||
        notification.content.toLowerCase().includes("discount") ||
        notification.content.toLowerCase().includes("sale") ||
        notification.content.toLowerCase().includes("offer")
    );
  }, [notifications]);

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await dispatch(markSingleNotificationAsRead(notificationId)).unwrap();
      toast.success("Notification marked as read");
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  const handleDeleteNotification = async (notificationId: number) => {
    try {
      await dispatch(deleteANotification(notificationId)).unwrap();
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (status === "loading") {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Promotion Notifications
        </h2>
        <div className="text-center py-8">
          <p className="text-red-500">
            Failed to load notifications. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Promotion Notifications
      </h2>

      {promotionNotifications.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Promotion Notifications
          </h3>
          <p className="text-gray-600">
            You'll see sales, discounts, and special offers here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {promotionNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                notification.is_read
                  ? "border-gray-200 bg-white"
                  : "border-purple-200 bg-purple-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3
                      className={`font-semibold ${
                        notification.is_read
                          ? "text-gray-800"
                          : "text-purple-800"
                      }`}
                    >
                      {notification.title}
                    </h3>
                    {!notification.is_read && (
                      <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm ${
                      notification.is_read ? "text-gray-600" : "text-purple-700"
                    } mb-2`}
                  >
                    {notification.content}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(notification.created_at)}
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {!notification.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="bg-purple-500 text-white text-xs px-3 py-1 rounded hover:bg-purple-600 transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete notification"
                  >
                    <img src={TrashIcon} alt="Delete" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPromotions;
