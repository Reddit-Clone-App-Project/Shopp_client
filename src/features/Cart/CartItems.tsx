import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

// SVG
import Trash from "../../assets/trash.svg";
import Heart from "../../assets/Heart.svg";
import ShopIcon from "../../assets/shop_icon.svg";
import EmptyCheckbox from "../../assets/empty_checkbox.svg";
import CheckBox from "../../assets/checkbox.svg";
import ChevronRight from "../../assets/HomePage/Category/chevron-right.svg";
import {
  CartData,
  toggleSelectItem,
  toggleSelectStore,
  clearCart,
  updateProductQuantityInCart,
  setStoreShippingMethod,
} from "./CartSlice";

interface CartItemsProps {
  cart: CartData | null;
  selectedItems: number[];
  handleSelectAll: () => void;
  isSelectedAll: boolean;
  handleRemoveItem: (productVariantId: number) => void;
}

const CartItems: React.FC<CartItemsProps> = ({
  cart,
  selectedItems,
  handleSelectAll,
  isSelectedAll,
  handleRemoveItem,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { storeShippingMethods } = useSelector(
    (state: RootState) => state.cart
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleShippingMethodChange = (
    storeId: number,
    shippingMethod: "express" | "fast" | "economical" | "bulky"
  ) => {
    dispatch(setStoreShippingMethod({ storeId, shippingMethod }));
  };

  return (
    <div className="w-full lg:basis-[70%]">
      {/* Cart Header */}
      <div className="bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 p-3 sm:p-4 gap-2 sm:gap-0">
        <button
          onClick={handleSelectAll}
          className="flex cursor-pointer items-center"
        >
          <img
            src={isSelectedAll ? CheckBox : EmptyCheckbox}
            alt="Select all"
            className="mr-2"
          />
          <span className="font-medium text-gray-500 text-sm sm:text-base">
            SELECT ALL
          </span>
        </button>

        {isSelectedAll && (
          <button
            className="flex items-center cursor-pointer"
            onClick={handleClearCart}
          >
            <img src={Trash} alt="Remove from Cart" className="h-5 mr-2" />
            <p className="font-medium text-gray-500 text-sm sm:text-base">
              DELETE
            </p>
          </button>
        )}
      </div>

      {/* Stores and Items list */}
      <div>
        {cart?.stores.map((store) => {
          const storeItemIds = store.items.map(
            (item) => item.product_variant_id
          );
          const isStoreSelected =
            storeItemIds.length > 0 &&
            storeItemIds.every((id) => selectedItems.includes(id));

          return (
            <div key={store.store_id} className="bg-white p-3 sm:p-4 mt-4">
              {/* Store Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <div
                  onClick={() => dispatch(toggleSelectStore(store.store_id))}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <img
                    src={isStoreSelected ? CheckBox : EmptyCheckbox}
                    alt="Select Shop"
                  />
                  <img src={ShopIcon} alt="Shop Icon" className="h-4" />
                  <h3 className="text-sm sm:text-base font-medium">
                    {store.store_name}
                  </h3>
                  <img src={ChevronRight} alt="Chevron Right" className="h-4" />
                </div>

                <select
                  name="shipping-method"
                  value={storeShippingMethods[store.store_id] || ""}
                  onChange={(e) =>
                    handleShippingMethodChange(
                      store.store_id,
                      e.target.value as
                        | "express"
                        | "fast"
                        | "economical"
                        | "bulky"
                    )
                  }
                  className="border border-gray-300 rounded p-2 text-xs sm:text-sm w-full sm:w-auto"
                >
                  <option value="">Choose your shipping method</option>
                  {store.store_express_shipping && (
                    <option value="express">Express Shipping - $30.00</option>
                  )}
                  {store.store_fast_shipping && (
                    <option value="fast">Fast Shipping - $25.00</option>
                  )}
                  {store.store_economical_shipping && (
                    <option value="economical">
                      Economical Shipping - $15.00
                    </option>
                  )}
                  {store.store_bulky_shipping && (
                    <option value="bulky">Bulky Shipping - $50.00</option>
                  )}
                </select>
              </div>

              {/* Products list for the store */}
              <div>
                {store.items.map((item) => {
                  const isItemSelected = selectedItems.includes(
                    item.product_variant_id
                  );
                  return (
                    <div
                      key={item.product_variant_id}
                      className="flex flex-col sm:flex-row items-start sm:items-center mt-4 gap-3 sm:gap-0"
                    >
                      <div className="w-full sm:basis-3/5 flex items-center">
                        <img
                          src={isItemSelected ? CheckBox : EmptyCheckbox}
                          alt="Select Item"
                          onClick={() =>
                            dispatch(toggleSelectItem(item.product_variant_id))
                          }
                          className="cursor-pointer flex-shrink-0"
                        />

                        <img
                          src={item.image_url}
                          alt={item.product_name}
                          className="h-20 sm:h-32 lg:h-40 ml-3 flex-shrink-0"
                        />

                        <div className="ml-3 flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-medium truncate">
                            {item.product_name}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            <span className="text-blue-700">type:</span>{" "}
                            {item.variant_name}
                          </p>
                        </div>
                      </div>

                      <div className="w-full sm:basis-1/5 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start">
                        <p className="text-blue-700 text-lg sm:text-xl font-semibold">
                          ${item.price_at_purchase}
                        </p>
                        <div className="flex gap-2 sm:gap-1 mt-0 sm:mt-2">
                          <img
                            className="h-4 cursor-pointer"
                            src={Heart}
                            alt="Add to Wishlist"
                          />
                          <img
                            className="h-4 cursor-pointer"
                            src={Trash}
                            alt="Remove from Cart"
                            onClick={() =>
                              handleRemoveItem(item.product_variant_id)
                            }
                          />
                        </div>
                      </div>

                      <div className="w-full sm:basis-1/5 flex items-center justify-center sm:justify-end gap-2 sm:gap-2">
                        <button
                          className="cursor-pointer font-bold text-lg sm:text-xl bg-gray-200 px-2 sm:px-3 py-0.5 rounded"
                          onClick={() => {
                            dispatch(
                              updateProductQuantityInCart({
                                productVariantId: item.product_variant_id,
                                quantity: item.quantity - 1,
                              })
                            );
                          }}
                        >
                          -
                        </button>
                        <p className="text-sm sm:text-base font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </p>
                        <button
                          className="cursor-pointer font-bold text-lg sm:text-xl bg-gray-200 px-2 sm:px-3 py-0.5 rounded"
                          onClick={() => {
                            dispatch(
                              updateProductQuantityInCart({
                                productVariantId: item.product_variant_id,
                                quantity: item.quantity + 1,
                              })
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartItems;
