import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchProductsByStoreId, fetchStoreOwned, setSelectedStoreId } from '../../features/StoreSlice/StoreSlice';
import { AllProducts } from "../../types/Item";

const AllProductSection = () => {
    const [active, setActive] = useState(0);
    const [violate, setViolate] = useState(0);
    const [pending, setPending] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const stores = useSelector((state: RootState) => state.stores.stores);
    const selectedStoreId = useSelector((state: RootState) => state.stores.selectedStoreId);
    const { allProducts: storeProducts, status, error } = useSelector((state: RootState) => state.stores);

    const store_id = selectedStoreId ?? stores[0]?.id; 

    useEffect(() => {
            dispatch(fetchStoreOwned());
    }, [dispatch]);

    useEffect(() => {
            if (stores.length > 0 && selectedStoreId == null) {
                dispatch(setSelectedStoreId(store_id));
            };
    }, [stores, selectedStoreId, dispatch]);

    useEffect(() => {
        if (store_id) {                                    
            dispatch(fetchProductsByStoreId(store_id));
        }
    }, [dispatch, store_id]);

    return (
        <>
            <header className="flex justify-between items-center">
                <h2 className="text-2xl">All Products</h2>
                <button className="bg-purple-800 rounded-xl p-2 px-3 text-xl">+ Add 1 new product</button>
            </header>
            <nav>
                <ul className="flex gap-10 mt-5 text-xl">
                    <li>All</li>
                    <li>Active ({})</li>
                    <li>Violate ({})</li>
                    <li>Pending approval by Shopp ({})</li>
                </ul>
            </nav>
            <div className="mt-10">
                <div>Provaaaa</div>
                {storeProducts.map((p: AllProducts) => (
                    <>
                        <div key={p.id}>{p.name}</div>
                    </>
                ))}
            </div>
        </>
    );
};

export default AllProductSection;