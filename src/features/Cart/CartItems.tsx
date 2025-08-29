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
    <div className="basis-[70%]">
      {/* Cart Header */}
      <div className="bg-white flex justify-between items-center mb-4 p-4">
        <button
          onClick={handleSelectAll}
          className="flex cursor-pointer items-center"
        >
          <img
            src={isSelectedAll ? CheckBox : EmptyCheckbox}
            alt="Select all"
            className="mr-2"
          />
          <span className="font-medium text-gray-500">SELECT ALL</span>
        </button>

        {isSelectedAll && (
          <button
            className="flex items-center cursor-pointer"
            onClick={handleClearCart}
          >
            <img src={Trash} alt="Remove from Cart" className="h-5 mr-2" />
            <p className="font-medium text-gray-500">DELETE</p>
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
            <div key={store.store_id} className="bg-white p-4 mt-4">
              {/* Store Header */}
              <div className="flex items-center justify-between">
                <div
                  onClick={() => dispatch(toggleSelectStore(store.store_id))}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <img
                    src={isStoreSelected ? CheckBox : EmptyCheckbox}
                    alt="Select Shop"
                  />
                  <img src={ShopIcon} alt="Shop Icon" className="h-4" />
                  <h3>{store.store_name}</h3>
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
                  className="border border-gray-300 rounded p-2"
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
                      className="flex items-center mt-4"
                    >
                      <div className="basis-3/5 flex items-center">
                        <img
                          src={isItemSelected ? CheckBox : EmptyCheckbox}
                          alt="Select Item"
                          onClick={() =>
                            dispatch(toggleSelectItem(item.product_variant_id))
                          }
                          className="cursor-pointer"
                        />

                        <img
                          src={item.image_url}
                          alt={item.product_name}
                          className="h-40"
                        />

                        <div>
                          <h4>{item.product_name}</h4>
                          <p>
                            <span className="text-blue-700">type:</span>{" "}
                            {item.variant_name}
                          </p>
                        </div>
                      </div>

                      <div className="basis-1/5 flex flex-col items-end">
                        <p className="text-blue-700 text-xl">
                          ${item.price_at_purchase}
                        </p>
                        <div className="flex gap-1">
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

                      <div className="basis-1/5 flex items-center justify-end gap-2">
                        <button
                          className="cursor-pointer font-bold text-xl bg-gray-200 px-3 py-0.5"
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
                        <p>{item.quantity}</p>
                        <button
                          className="cursor-pointer font-bold text-xl bg-gray-200 px-3 py-0.5"
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
