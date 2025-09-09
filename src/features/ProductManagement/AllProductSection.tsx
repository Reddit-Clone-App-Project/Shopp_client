import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchProductsByStoreId } from "../StoreProducts/StoreProductSlice";

const AllProductSection = () => {
    const [active, setActive] = useState(0);
    const [violate, setViolate] = useState(0);
    const [pending, setPending] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const { allProducts, status, error } = useSelector((state: RootState) => state.storeProducts);
    const loading = status.fetchProductsByStoreId === 'loading';
    const selectedStoreId = useSelector((state: RootState) => state.stores.selectedStoreId);
    const stores = useSelector((state: RootState) => state.stores.stores);
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const storeId = selectedStoreId ?? stores[0]?.id; 

    useEffect(() => {
        if (token && storeId) {                                    
            console.log('Fetching products for store', storeId);
            dispatch(fetchProductsByStoreId({storeId, limit, offset}));
        }
    }, [dispatch, token, storeId, limit, offset]);

    console.log(allProducts);

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
                {loading && <div>Loading Products…</div>}
                {error && <div className="text-red-500">Error: {error}</div>}
                {status.fetchProductsByStoreId === 'succeeded' && allProducts.length === 0 && (
                    <div>No product</div>
                )}
                {status.fetchProductsByStoreId === 'succeeded' && allProducts.length > 0 && (
                    <table className="min-w-full border">
                        <thead>
                            <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Category</th>
                            <th className="border px-4 py-2">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProducts.map((p) => (
                            <tr key={p.id}>
                                <td className="border px-4 py-2">{p.name}</td>
                                <td className="border px-4 py-2">{p.is_active}</td>
                                <td className="border px-4 py-2">{p.description}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div>Provaaaa</div>
            </div>
        </>
    );
};

export default AllProductSection;