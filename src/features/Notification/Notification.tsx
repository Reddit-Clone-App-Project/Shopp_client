import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { fetchNotifications } from "./NotificationSlice";

const Notification = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Content */}
      <Outlet />
    </div>
  );
};

export default Notification;
