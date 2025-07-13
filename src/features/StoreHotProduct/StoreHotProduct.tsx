import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchStoreHotProducts } from './StoreHotProductSlice';
import ItemCard from "../../components/Item";

const StoreHotProduct: React.FC<{ store_id: number }> = ({ store_id }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, status } = useSelector((state: RootState) => state.storeHotProducts);

    useEffect(() => {
        if (status === 'idle') {
            const promise = dispatch(fetchStoreHotProducts({ storeId: store_id, limit: 4, offset: 0 }));
            return () => {
                promise.abort(); // Clean up the promise if the component unmounts
            }
        }
    }, []);


    return (
        <div>
            <h2>Shop's Top Products</h2>
            {products.length === 0 ? <p>Loading hot products...</p> :  products.map((product, index) => (
                    <ItemCard key={index} flashSaleItem={null} item={product} />
                ))
            }
        </div>
    )
}

export default StoreHotProduct