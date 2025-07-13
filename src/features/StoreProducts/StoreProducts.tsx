import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchStoreProducts } from './StoreProductSlice';
import ItemCard from "../../components/Item";


const StoreProducts = ({store_id}: {store_id: number}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector((state: RootState) => state.storeProducts);

  React.useEffect(() => {
    if (products.length === 0 && status === 'idle') {
        const promise = dispatch(fetchStoreProducts({ storeId: store_id, limit: 10, offset: 0 }));
    
        return () => {
            promise.abort(); // Clean up the promise if the component unmounts
        }
    }
  }, []);

  return (
    <div className='my-8'>
        <h2 className='text-xl mb-4'>OTHER PRODUCTS OF THE STORE</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.length === 0 ? (
                <p>Loading products...</p>
            ) : products.map((product, index) => <ItemCard key={index} flashSaleItem={null} item={product} />)}
        </div>
    </div>
  )
}

export default StoreProducts