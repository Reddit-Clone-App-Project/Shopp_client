import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BuyerHeader from "../../features/BuyerHeader/BuyerHeader";
import SuggestionOfTheDay from "../../features/SuggestionOfTheDay/SuggestionOfTheDay";
import Footer from "../../components/Footer";
import { AppDispatch, RootState } from "../../redux/store";
import CartItems from "../../features/Cart/CartItems";
import { removeFromCart, toggleSelectAll } from "../../features/Cart/CartSlice";
import OrderSummary from "../../features/Cart/OrderSummary";
import { fetchBuyerAddress } from "../../features/BuyerAddress/BuyerAddressSlice";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, selectedItems, storeShippingMethods } = useSelector(
    (state: RootState) => state.cart
  );
  const { addresses, status } = useSelector(
    (state: RootState) => state.buyerAddress
  );

  const address = addresses?.find((address) => address.is_default) || null;
  const handleSelectAll = () => {
    dispatch(toggleSelectAll());
  };

  const handleRemoveItem = (productVariantId: number) => {
    dispatch(removeFromCart(productVariantId));
  };

  const allItemIds =
    cart?.stores.flatMap((store) =>
      store.items.map((item) => item.product_variant_id)
    ) || [];
  const isSelectedAll =
    allItemIds.length > 0 && selectedItems.length === allItemIds.length;

  useEffect(() => {
    if (status === "idle" || !address) {
      // Fetch the buyer address when the component mounts
      const promise = dispatch(fetchBuyerAddress());

      return () => {
        promise.abort();
      };
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <header>
        <BuyerHeader />
      </header>

      <div className="mt-[56px] md:mt-[92px]">
        <div className="flex flex-col lg:flex-row items-start pt-4 lg:pt-10 mx-2 sm:mx-4 lg:mx-14 gap-4 lg:gap-[2rem]">
          <CartItems
            cart={cart}
            selectedItems={selectedItems}
            handleSelectAll={handleSelectAll}
            isSelectedAll={isSelectedAll}
            handleRemoveItem={handleRemoveItem}
          />
          <OrderSummary
            address={address}
            cart={cart}
            selectedItems={selectedItems}
            storeShippingMethods={storeShippingMethods}
          />
        </div>

        <SuggestionOfTheDay />
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default CartPage;
