import { useSelector, useDispatch } from 'react-redux'
import BuyerHeader from '../../features/BuyerHeader/BuyerHeader'
import SuggestionOfTheDay from '../../features/SuggestionOfTheDay/SuggestionOfTheDay'
import Footer from '../../components/Footer'
import { AppDispatch, RootState } from '../../redux/store'
import CartItems from '../../features/Cart/CartItems'
import { removeFromCart, toggleSelectAll } from '../../features/Cart/CartSlice'
import OrderSummary from '../../features/Cart/OrderSummary'

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, selectedItems} = useSelector((state: RootState) => state.cart);
  const { address } = useSelector(
      (state: RootState) => state.buyerAddress
  );

  const handleSelectAll = () => {
    dispatch(toggleSelectAll());
  };

  const handleRemoveItem = (productVariantId: number) => {
    dispatch(removeFromCart(productVariantId));
  };

  const allItemIds = cart?.stores.flatMap(store => store.items.map(item => item.product_variant_id)) || [];
  const isSelectedAll = allItemIds.length > 0 && selectedItems.length === allItemIds.length;
  return (
    <div>
      <header>
        <BuyerHeader />
      </header>

      <div className='mt-[56px] md:mt-[92px] bg-gray-100'>
        <div className='flex items-start pt-10 mx-0 lg:mx-14 gap-[2rem]'>
          <CartItems
            cart={cart}
            selectedItems={selectedItems}
            handleSelectAll={handleSelectAll}
            isSelectedAll={isSelectedAll}
            handleRemoveItem={handleRemoveItem}
          />
          <OrderSummary address={address} cart={cart} selectedItems={selectedItems} />
        </div>

        <SuggestionOfTheDay />
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default CartPage