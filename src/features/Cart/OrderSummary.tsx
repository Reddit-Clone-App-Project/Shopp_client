import React from 'react';
import Location from '../../assets/Product/Location.svg';
import { CartData } from './CartSlice';

interface OrderSummaryProps {
  address: string; 
  cart: CartData | null;
  selectedItems: number[];
}


const OrderSummary: React.FC<OrderSummaryProps> = ({ address, cart, selectedItems }) => {
  // Find all selected products from the cart
  const selectedCartItems = cart?.stores.flatMap(store =>
    store.items.filter(item => selectedItems.includes(item.product_variant_id))
  ) || [];

  // Total products and payment
  const totalItems = selectedCartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = selectedCartItems.reduce((acc, item) => acc + (item.price_at_purchase * item.quantity), 0);

  return (
    <div className='basis-30% bg-blue-200 p-4'>
      <h4 className='text-lg font-semibold text-gray-500'>Location</h4>
      <div className='flex items-center justify-between gap-4 my-4'>
          <div className='flex items-center'>
              <img 
                src={Location} 
                alt="Location" 
                className='h-6 mr-2'
              />
              <p className='font-semibold'>{address ? address : 'Your address might not be set up, or the address is fetching'}</p>
          </div>
          <p className='text-blue-500 cursor-pointer hover:underline'>{address ? 'Change' : 'Update'}</p>
      </div>
      <h3 className='text-xl font-semibold'>Order Summary</h3>
      <div className='flex justify-between my-2'>
        <p>
          Subtotal ({totalItems} {totalItems > 1 ? 'ITEMS' : 'ITEM'})
        </p>
        <p>${subtotal.toFixed(2)}</p>
      </div>

      <div className='flex justify-between my-2'>
        <p>Shipping Fee</p>
        <p>{`$${(totalItems * 10).toFixed(2)}`}</p>
      </div>

      <div className='flex flex-col mb-4'>
        <div className='flex justify-between'>
          <p>Total</p>
          <p>${(subtotal + 10 * totalItems).toFixed(2)}</p>
        </div>
        <p className='self-end text-sm text-gray-600'>VAT Included</p>
      </div>

      <button className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg hover:bg-purple-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-102 cursor-pointer">Proceed to Checkout{`(${totalItems} items)`}</button>
    </div>
  );
};

export default OrderSummary;