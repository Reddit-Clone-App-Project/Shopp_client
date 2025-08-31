import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { deleteOrderById, fetchOrders } from "../features/Orders/OrdersSlice";
import OrdersSkeleton from "./OrdersSkeleton";
// SVG
import Search from "../assets/Order/search.svg";
import Chat from "../assets/Order/Chat.svg";
import Shop from "../assets/Order/Open_shop.svg";
import Truck from "../assets/Order/Truck.svg";
import Help from "../assets/Order/Help.svg";
import GenericAvatar from "../assets/generic-avatar.svg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export const handleTransferOrderStatus = (orderStatus: string) => {
  if (orderStatus === "pending") return "Waiting For Payment";
  if (orderStatus === "paid") return "Shipping";
  if (orderStatus === "shipped") return "Wait for Delivery";
  if (orderStatus === "delivered") return "Completed";
  if (orderStatus === "cancelled" || orderStatus === "failed") return "Aborted";
  if (orderStatus === "returned") return "Refunded";
};

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("All");

  const { orders, status, error } = useSelector(
    (state: RootState) => state.orders
  );
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const filterOrders = (
    filterType: string,
    searchText: string = searchTerm
  ) => {
    let filtered = orders;

    // Filter by status
    if (filterType !== "All") {
      filtered = orders.filter((order) => {
        const status = handleTransferOrderStatus(order.order_status);
        return status === filterType;
      });
    }

    // Filter by search term
    if (searchText.trim()) {
      filtered = filtered.filter((order) => {
        const searchLower = searchText.toLowerCase();
        return (
          order.store.name.toLowerCase().includes(searchLower) ||
          order.order_id.toString().includes(searchLower) ||
          order.products.some((product) =>
            product.product_name.toLowerCase().includes(searchLower)
          )
        );
      });
    }

    setFilteredOrders(filtered);
  };

  const handleFilterClick = (filterType: string) => {
    setCurrentFilter(filterType);
    filterOrders(filterType);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterOrders(currentFilter, value);
  };

  const handleRemoveOrderById = async (orderId: number) => {
    try {
      await dispatch(deleteOrderById(orderId));
      toast.success("Order deleted successfully");
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  useEffect(() => {
    const promise = dispatch(fetchOrders());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0) {
      filterOrders(currentFilter);
    }
  }, [orders]);

  const navItems = [
    "All",
    "Waiting For Payment",
    "Shipping",
    "Wait for delivery",
    "Completed",
    "Aborted",
    "Refunded",
  ];

  return (
    <div>
      <nav className="flex gap-4 text-lg mb-4">
        {navItems.map((item) => (
          <p
            key={item}
            onClick={() => handleFilterClick(item)}
            className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
              currentFilter === item
                ? "bg-purple-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item}
          </p>
        ))}
      </nav>

      <div className="flex items-center border border-gray-300 rounded-md p-2">
        <img src={Search} alt="Search" className="mr-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search orders by Shop's Name, Order ID or Product's Name"
          className="flex-1 outline-none"
        />
      </div>

      <div className="space-y-4 mt-6">
        {status === "loading" ? (
          <OrdersSkeleton />
        ) : status === "failed" ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-2">
              Failed to load orders
            </div>
            <p className="text-gray-400 mb-4">
              {error || "An error occurred while fetching your orders."}
            </p>
            <button
              onClick={() => dispatch(fetchOrders())}
              className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No orders found</div>
            <p className="text-gray-400">
              {currentFilter === "All"
                ? "You haven't placed any orders yet."
                : `No orders found with status "${currentFilter}".`}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.order_id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
            >
              {/* Shop header */}
              <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <img
                    src={order.store.profile_img ?? GenericAvatar}
                    alt="Shop logo"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-gray-900">
                    {order.store.name}
                  </span>
                  <button className="flex items-center gap-1 space-x-1 py-1 px-2 bg-purple-500 text-white text-sm cursor-pointer">
                    <img src={Chat} alt="Chat with Shop" className="w-4 h-4" />
                    <span>Chat</span>
                  </button>
                  <Link
                    to={`/shop/${order.store.id}`}
                    className="flex items-center gap-1 space-x-1 text-sm border cursor-pointer p-1"
                  >
                    <img src={Shop} alt="View Shop" className="w-4 h-4" />
                    <span>View Store</span>
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  {order.order_status !== "cancelled" &&
                    order.order_status !== "failed" && (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <img
                          src={Truck}
                          alt="Shipping Status"
                          className="w-4 h-4"
                        />
                        <span className="text-sm">
                          {order.current_status.status}
                        </span>
                        <img
                          src={Help}
                          alt="Help"
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                    )}
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    {handleTransferOrderStatus(order.order_status)}
                  </span>
                </div>
              </div>

              {/* Order Products */}
              <div className="p-4">
                {order.products.map((product) =>
                  product.variants.map((variant) => (
                    <div
                      key={variant.variant_id}
                      className="flex items-center space-x-4 py-3"
                    >
                      <img
                        src={variant.image_url}
                        alt={product.product_name}
                        className="w-20 h-20 object-cover rounded-md border border-gray-200"
                      />
                      <div className="flex-1">
                        <span className="block text-gray-900 font-bold text-lg">
                          {product.product_name}
                        </span>
                        <span className="block text-gray-700 font-medium text-base">
                          {variant.variant_name}
                        </span>
                        <span className="text-gray-500 text-sm">
                          x{variant.quantity}
                        </span>
                      </div>
                      <span className="font-semibold text-blue-600 text-lg">
                        {variant.price_at_purchase}$
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                <span className="text-gray-600 text-xl">Total amount</span>
                <span className="text-2xl font-bold text-blue-600">
                  {order.total_paid}$
                </span>
              </div>

              {/* Order Actions */}
              {order.order_status === "pending" && (
                <div className="px-4 py-3 border-t border-gray-200 flex justify-center space-x-3">
                  <button className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors cursor-pointer">
                    Pay Now
                  </button>
                  <Link
                    to={`/me/orders/${order.order_id}`}
                    className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors cursor-pointer"
                  >
                    Order Details
                  </Link>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                    Contact Seller
                  </button>
                  <button
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleRemoveOrderById(order.order_id)}
                  >
                    Cancel Order
                  </button>
                </div>
              )}
              {(order.order_status === "paid" ||
                order.order_status === "shipped") && (
                <div className="px-4 py-3 border-t border-gray-200 flex justify-center space-x-3">
                  <Link
                    to={`/me/orders/${order.order_id}`}
                    className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors cursor-pointer"
                  >
                    Order Details
                  </Link>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                    Contact Seller
                  </button>
                  <button
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleRemoveOrderById(order.order_id)}
                  >
                    Cancel Order
                  </button>
                </div>
              )}
              {order.order_status === "delivered" && (
                <div className="px-4 py-3 border-t border-gray-200 flex justify-center space-x-3">
                  <button className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors cursor-pointer">
                    Rate this product
                  </button>
                  <Link
                    to={`/me/orders/${order.order_id}`}
                    className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors cursor-pointer"
                  >
                    Order Details
                  </Link>
                  <button className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors cursor-pointer">
                    Buy Again
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                    Request A Refund
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                    Contact Seller
                  </button>
                </div>
              )}
              {(order.order_status === "cancelled" ||
                order.order_status === "failed") && (
                <div className="px-4 py-3 border-t border-gray-200 flex justify-center space-x-3">
                  <button className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors cursor-pointer">
                    Reorder
                  </button>
                  <Link
                    to={`/me/orders/${order.order_id}`}
                    className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors cursor-pointer"
                  >
                    Order Details
                  </Link>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                    Contact Seller
                  </button>
                </div>
              )}
              {order.order_status === "returned" && (
                <div className="px-4 py-3 border-t border-gray-200 flex justify-center space-x-3">
                  <button className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors cursor-pointer">
                    View Refund Details
                  </button>
                  <Link
                    to={`/me/orders/${order.order_id}`}
                    className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors cursor-pointer"
                  >
                    Order Details
                  </Link>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                    Contact Seller
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
