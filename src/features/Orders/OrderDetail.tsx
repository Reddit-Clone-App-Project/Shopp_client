import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderDetail } from "./OrderDetailSlice";
import { handleTransferOrderStatus } from "../../components/Orders";
import OrderDetailSkeleton from "../../components/OrderDetailSkeleton";

// SVG
import LeftChevron from "../../assets/HomePage/Category/chevron-left.svg";

const OrderDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { order, status, error } = useSelector(
    (state: RootState) => state.orderDetail
  );
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetail(Number(id)));
    }
  }, [dispatch, id]);

  const handleBackToOrders = () => {
    navigate("/me/orders");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(price));
  };

  if (status === "loading") {
    return <OrderDetailSkeleton />;
  }

  if (status === "failed") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error Loading Order
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleBackToOrders}
            className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return <OrderDetailSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Order Detail Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleBackToOrders}
          className="cursor-pointer flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <img src={LeftChevron} alt="Back to Orders" className="w-5 h-5" />
          <span className="font-medium">Back to Orders</span>
        </button>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            order.order_status === "delivered"
              ? "bg-green-100 text-green-800"
              : order.order_status === "shipped"
              ? "bg-blue-100 text-blue-800"
              : order.order_status === "cancelled"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {handleTransferOrderStatus(order.order_status)}
        </span>
      </div>

      {/* Order Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Order Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-medium">#{order.order_id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Order Date</p>
            <p className="font-medium">{formatDate(order.created_at)}</p>
          </div>
        </div>
      </div>

      {/* Store Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Store</h3>
        <div className="flex items-center space-x-4">
          {order.store.profile_img ? (
            <img
              src={order.store.profile_img}
              alt={order.store.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 font-semibold">
                {order.store.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <h4 className="font-medium text-gray-900">{order.store.name}</h4>
        </div>
      </div>

      {/* Products */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Items</h3>
        <div className="space-y-4">
          {order.products.map((product) => (
            <div
              key={product.product_id}
              className="border-b border-gray-100 pb-4 last:border-b-0"
            >
              <h4 className="font-medium text-gray-900 mb-3">
                {product.product_name}
              </h4>
              {product.variants.map((variant) => (
                <div
                  key={variant.variant_id}
                  className="flex items-center space-x-4 mb-2"
                >
                  <img
                    src={variant.image_url}
                    alt={variant.variant_name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      {variant.variant_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {variant.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatPrice(variant.price_at_purchase)}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
        <div className="text-gray-700">
          <p className="font-medium">{order.shipping_address.full_name}</p>
          <p>{order.shipping_address.phone_number}</p>
          <p>{order.shipping_address.address_line1}</p>
          {order.shipping_address.address_line2 && (
            <p>{order.shipping_address.address_line2}</p>
          )}
          <p>
            {order.shipping_address.city}, {order.shipping_address.province}{" "}
            {order.shipping_address.postal_code}
          </p>
          <p>{order.shipping_address.country}</p>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Order Timeline</h3>
        <div className="space-y-4">
          {order.order_logs.map((log, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div
                className='w-3 h-3 rounded-full mt-2 bg-purple-600'
              ></div>
              <div className="flex-1">
                <p className="font-medium">
                  {log.status}
                </p>
                <p className="text-sm text-gray-600">
                  {formatDate(log.timestamp)}
                </p>
                {log.storage_location && (
                  <p className="text-sm text-gray-500">
                    Location: {log.storage_location}
                  </p>
                )}
                {log.shipper_name && (
                  <p className="text-sm text-gray-500">
                    Shipper: {log.shipper_name}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Amount */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Total Paid</h3>
          <p className="text-xl font-bold text-blue-600">
            {formatPrice(order.total_paid)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
