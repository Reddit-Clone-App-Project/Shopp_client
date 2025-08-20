import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchStoreOwned, setSelectedStoreId } from '../../features/StoreSlice/StoreSlice';

const AllProductSection = () => {
    const [active, setActive] = useState(0);
    const [violate, setViolate] = useState(0);
    const [pending, setPending] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const stores = useSelector((state: RootState) => state.stores.stores);
    const selectedStoreId = useSelector((state: RootState) => state.stores.selectedStoreId);

    useEffect(() => {
            dispatch(fetchStoreOwned());
    }, [dispatch]);

    useEffect(() => {
            if (stores.length > 0 && selectedStoreId == null) {
                dispatch(setSelectedStoreId(stores[0].id));
            };
    }, [stores, selectedStoreId, dispatch]);

    useEffect(() => {
        dispatch(getAllProductByStoreId());
    }, [dispatch]);

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
        </>
    );
};

export default AllProductSection;