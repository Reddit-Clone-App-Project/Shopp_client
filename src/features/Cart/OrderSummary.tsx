import React from "react";
import Location from "../../assets/Product/Location.svg";
import { CartData } from "./CartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { checkout } from "../../api";
import { BuyerAddress } from "../BuyerAddress/BuyerAddressSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface OrderSummaryProps {
  address: BuyerAddress | null;
  cart: CartData | null;
  selectedItems: number[];
  storeShippingMethods: {
    [storeId: number]: "express" | "fast" | "economical" | "bulky";
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  address,
  cart,
  selectedItems,
  storeShippingMethods,
}) => {
  const getShippingCost = (
    shippingMethod: "express" | "fast" | "economical" | "bulky"
  ) => {
    switch (shippingMethod) {
      case "express":
        return 30;
      case "fast":
        return 25;
      case "economical":
        return 15;
      case "bulky":
        return 50;
      default:
        return 0;
    }
  };

  // Build stores data that matches the API format
  const buildCheckoutStores = () => {
    if (!cart) return [];

    return cart.stores
      .map((store) => {
        // Filter items for this store that are selected
        const selectedStoreItems = store.items.filter((item) =>
          selectedItems.includes(item.product_variant_id)
        );

        if (selectedStoreItems.length === 0) return null;

        const shippingMethod = storeShippingMethods[store.store_id];
        const shipping_cost = shippingMethod
          ? getShippingCost(shippingMethod)
          : 0;

        return {
          store_id: store.store_id,
          items: selectedStoreItems.map((item) => ({
            product_name: item.product_name,
            image_url: item.image_url,
            price_at_purchase: item.price_at_purchase,
            product_variant_id: item.product_variant_id,
            quantity: item.quantity,
          })),
          shipping_cost,
        };
      })
      .filter((store) => store !== null);
  };

  // Calculate totals
  const selectedCartItems =
    cart?.stores.flatMap((store) =>
      store.items.filter((item) =>
        selectedItems.includes(item.product_variant_id)
      )
    ) || [];

  // Total products and payment
  const totalItems = selectedCartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const subtotal = selectedCartItems.reduce(
    (acc, item) => acc + item.price_at_purchase * item.quantity,
    0
  );

  // Calculate total shipping cost
  const totalShippingCost = Object.entries(storeShippingMethods).reduce(
    (total, [storeId, method]) => {
      const store = cart?.stores.find((s) => s.store_id === parseInt(storeId));
      if (
        store &&
        store.items.some((item) =>
          selectedItems.includes(item.product_variant_id)
        )
      ) {
        return total + getShippingCost(method);
      }
      return total;
    },
    0
  );

  const makePayment = async () => {
    try {
      // Validate address
      if (!address || !address.id) {
        toast.error("Please select or add a delivery address");
        return;
      }

      // Validate selected items
      if (selectedItems.length === 0) {
        toast.error("Please select items to checkout");
        return;
      }

      // Validate shipping methods for stores with selected items
      const storesWithSelectedItems =
        cart?.stores.filter((store) =>
          store.items.some((item) =>
            selectedItems.includes(item.product_variant_id)
          )
        ) || [];

      for (const store of storesWithSelectedItems) {
        if (!storeShippingMethods[store.store_id]) {
          toast.error(
            `Please select a shipping method for ${store.store_name}`
          );
          return;
        }
      }

      const checkoutStores = buildCheckoutStores();

      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLIC_KEY as string
      );
      const session = await checkout(
        checkoutStores,
        totalShippingCost,
        address.id
      );

      const result = await stripe?.redirectToCheckout({
        sessionId: session.data.id,
      });

      if (result?.error) {
        toast.error(result.error.message || "Payment failed");
      }
    } catch (error: any) {
      console.error("Error during payment:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Payment failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full lg:basis-[30%] bg-blue-200 p-3 sm:p-4 lg:sticky lg:top-4 lg:self-start">
      <h4 className="text-base sm:text-lg font-semibold text-gray-500">
        Location
      </h4>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 my-3 sm:my-4">
        <div className="flex items-start sm:items-center flex-1">
          <img
            src={Location}
            alt="Location"
            className="h-5 sm:h-6 mr-2 mt-0.5 sm:mt-0 flex-shrink-0"
          />
          <p className="font-medium text-sm sm:text-base leading-tight">
            {address
              ? `${address.address_line1}, ${address.address_line2}, ${address.city}, ${address.province}`
              : "Your address might not be set up, or the address is fetching"}
          </p>
        </div>
        {address ? (
          <Link
            to="/me/my-account/address"
            className="text-blue-500 cursor-pointer hover:underline text-sm sm:text-base flex-shrink-0"
          >
            Change
          </Link>
        ) : (
          <Link
            to="/me/my-account/address"
            className="text-blue-500 cursor-pointer hover:underline text-sm sm:text-base flex-shrink-0"
          >
            Update
          </Link>
        )}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-3">Order Summary</h3>
      <div className="flex justify-between items-center my-2">
        <p className="text-sm sm:text-base">
          Subtotal ({totalItems} {totalItems > 1 ? "ITEMS" : "ITEM"})
        </p>
        <p className="text-sm sm:text-base font-medium">
          ${subtotal.toFixed(2)}
        </p>
      </div>

      <div className="flex justify-between items-center my-2">
        <p className="text-sm sm:text-base">Shipping Fee</p>
        <p className="text-sm sm:text-base font-medium">
          ${totalShippingCost.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col mb-4 border-t pt-3">
        <div className="flex justify-between items-center">
          <p className="text-base sm:text-lg font-semibold">Total</p>
          <p className="text-base sm:text-lg font-semibold">
            ${(subtotal + totalShippingCost).toFixed(2)}
          </p>
        </div>
        <p className="self-end text-xs sm:text-sm text-gray-600">
          VAT Included
        </p>
      </div>

      <button
        className="block w-full bg-purple-600 text-white text-center py-3 sm:py-4 rounded-lg hover:bg-purple-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-102 cursor-pointer text-sm sm:text-base"
        onClick={makePayment}
      >
        Proceed to Checkout{`(${totalItems} items)`}
      </button>
    </div>
  );
};

export default OrderSummary;
