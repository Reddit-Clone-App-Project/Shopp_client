import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchStoreDiscounts } from './StoreDiscountSlice';
import { useParams } from 'react-router-dom';

const ShopDiscount : React.FC<{ store_id: number }> = ({ store_id }) => {
  const dispatch: AppDispatch = useDispatch();
  const { discounts, status, error } = useSelector((state: RootState) => state.discount);

  useEffect(() => {
    const promise = dispatch(fetchStoreDiscounts(store_id));

    return () => {
      promise.abort(); // Clean up the promise if the component unmounts
    }
  }, [dispatch, store_id]);

  return (
    <div className='bg-white p-6'>
      <h2 className='text-lg'>Shop Discounts</h2>
      {status === 'loading' && <p>Loading discounts...</p>}
      {status === 'succeeded' && discounts.map(discount => (
        <div key={discount.id} className='bg-blue-100 mt-2 p-4 flex justify-between'>
          <div>
            <h3>{discount.name}</h3>
            {discount.description && <p>{discount.description}</p>}
            <p className='text-sm'>Expiry: {new Date(discount.end_at).toLocaleDateString()}</p>
          </div>
          <button className='cursor-pointer px-2 border border-blue-800'>Use now</button>
        </div>
      ))}
      {status === 'failed' && <p>Error: {error}</p>}
    </div>
  )
}

export default ShopDiscount