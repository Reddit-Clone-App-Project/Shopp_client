import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchStoreOwned, setSelectedStoreId } from '../../features/StoreSlice/StoreSlice';
import { fetchProductsByStoreId } from "../StoreProducts/StoreProductSlice";
import { Link } from "react-router-dom";
import CategoryFilter from "../../components/CategoryFilter";
import { userInfo } from "os";
import { AllProducts } from "../../types/Item";

const AllProductSection = () => {
    const [all, setAll] = useState(true);
    const [active, setActive] = useState(false);
    const [violate, setViolate] = useState(false);
    const [pending, setPending] = useState(false);
    const [filter, setFilter] = useState<'all' | 'active' | 'violate' | 'pending'>('all');
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [category, setCategory] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const stores = useSelector((state: RootState) => state.stores.stores);
    const selectedStoreId = useSelector((state: RootState) => state.stores.selectedStoreId);
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const { allProducts, status, error } = useSelector((state: RootState) => state.storeProducts);
    const loading = status.fetchProductsByStoreId === 'loading';

    const storeId = selectedStoreId ?? stores[0]?.id; 

    const categories = [
        'Electronics',
        'Clothing',
        'Home',
        'Books',
        'Toys',
    ];

    useEffect(() => {
        if (token) {
            dispatch(fetchStoreOwned());
        };
    }, [dispatch, token]);

    useEffect(() => {
            if (stores.length > 0 && selectedStoreId == null && token) {
                dispatch(setSelectedStoreId(storeId));
            };
    }, [stores, selectedStoreId, dispatch, token]);

    useEffect(() => {
        if (token && storeId) {                                    
            dispatch(fetchProductsByStoreId({storeId, limit, offset}));
        }
    }, [dispatch, token, storeId, limit, offset]);

    const activeProducts = allProducts.filter((p) => p.is_active === true);
    const countActive = activeProducts.length;
    const violateProducts = allProducts.filter((p) => p.is_active === false);
    const countViolate = violateProducts.length;
    const pendingProducts = allProducts.filter((p) => p.is_published === false);
    const countPending = pendingProducts.length;

    const filteredState = (state: "all" | "active" | "violate" | "pending") => {
        setFilter(state);
    };

    return (
        <>
            <header className="flex justify-between items-center">
                <h2 className="text-2xl">All Products</h2>
                <Link to='/seller/product/create' className="bg-purple-800 rounded-xl p-2 px-3 text-xl">+ Add 1 new product</Link>
            </header>
            <nav>
                <ul className="flex gap-10 mt-5 text-xl">
                    <li className={filter === 'all' ? 'text-[#A567C6] cursor-pointer hover:underline-none underline' : 'cursor-pointer hover:underline hover:text-[#A567C6]'} onClick={() => filteredState('all')}>All</li>
                    <li className={filter === 'active' ? 'text-[#A567C6] cursor-pointer hover:underline-none underline' : 'cursor-pointer hover:underline hover:text-[#A567C6]'} onClick={() => filteredState('active')}>Active ({countActive})</li>
                    <li className={filter === 'violate' ? 'text-[#A567C6] cursor-pointer hover:underline-none underline' : 'cursor-pointer hover:underline hover:text-[#A567C6]'} onClick={() => filteredState('violate')}>Violate ({countViolate})</li>
                    <li className={filter === 'pending' ? 'text-[#A567C6] cursor-pointer hover:underline-none underline' : 'cursor-pointer hover:underline hover:text-[#A567C6]'} onClick={() => filteredState('pending')}>Pending approval by Shopp ({countPending})</li>
                </ul>
            </nav>
            <div className="mt-10 bg-gray-900 p-5 rounded-xl">
                {loading && <div>Loading Products…</div>}
                {error && <div className="text-red-500">Error: {error}</div>}
                {status.fetchProductsByStoreId === 'succeeded' && allProducts.length === 0 && (
                    <div>No product</div>
                )}
                <div className="max-w-fit flex">
                    <div className="flex border rounded-3xl px-3 py-1">
                        <p>Find product</p>
                        <input 
                            type="text" 
                            placeholder="Enter product name, product's SKU, product Id"
                            className="text-[#A6AFD8] ml-5 focus:outline-none min-w-82"    
                        />
                    </div>
                    <button 
                        type="button"
                        className="ml-12 bg-gray-700 px-7 py-0.5 rounded-lg text-md h-fit self-center" 
                    >
                        Apply
                    </button>
                </div>
                <div className="flex max-w-fit py-3 mb-6">
                    <div className="flex border rounded-3xl px-3 py-1">
                        <p>Product category</p>
                        <div className="text-[#A6AFD8]"> 
                            <CategoryFilter 
                                options={categories}
                                placeholder='Find by category'
                                onSelect={(value) => setCategory(value)}
                            />
                        </div>
                    </div>
                    <button 
                        type="button"
                        className="ml-12 bg-gray-700 px-7 py-0.5 rounded-lg text-md h-fit self-center" 
                    >
                        Reset
                    </button>
                </div>
                <p className="mb-3">0 products</p>
                {status.fetchProductsByStoreId === 'succeeded' && allProducts.length > 0 && (
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-700 text-center text-xl">
                                <th className="px-4 py-2 font-normal rounded-l-xl">Product's name</th>
                                <th className="px-4 py-2 font-normal">Variant's name</th>
                                <th className="px-4 py-2 font-normal">Category</th>
                                <th className="px-4 py-2 font-normal">Price</th>
                                <th className="px-4 py-2 font-normal">Sales</th>
                                <th className="px-4 py-2 font-normal">Stock quantity</th>
                                <th className="px-4 py-2 font-normal">Content quality</th>
                                <th className="px-4 py-2 font-normal rounded-r-xl">Action</th>
                            </tr>
                        </thead>
                        {filter === 'all' &&
                            <tbody>
                                {allProducts.map((p) => (
                                <tr key={p.id} className="border-b-[0.01rem] text-center">
                                    <td className="px-4 py-2">{p.name}</td>
                                    <td className="px-4 py-2">{p.variant_name}</td>
                                    <td className="px-4 py-2">{p.category_name}</td>
                                    <td className="px-4 py-2">{p.variant_price} $</td>
                                    <td className="px-4 py-2">{p.bought}</td>
                                    <td className="px-4 py-2">{p.variant_stock}</td>
                                    <td className="px-4 py-2">{p.is_active ? 'OK' : 'NOT GOOD'}</td>
                                    <td className="px-4 py-2">View</td>
                                </tr>
                                ))}
                            </tbody>
                        }
                        {filter === 'active' &&
                            <tbody>
                                {activeProducts.map((p) => (
                                <tr key={p.id} className="border-b-[0.01rem] text-center">
                                    <td className="px-4 py-2">{p.name}</td>
                                    <td className="px-4 py-2">{p.variant_name}</td>
                                    <td className="px-4 py-2">{p.category_name}</td>
                                    <td className="px-4 py-2">{p.variant_price} $</td>
                                    <td className="px-4 py-2">{p.bought}</td>
                                    <td className="px-4 py-2">{p.variant_stock}</td>
                                    <td className="px-4 py-2">{p.is_active ? 'OK' : 'NOT GOOD'}</td>
                                    <td className="px-4 py-2">View</td>
                                </tr>
                                ))}
                            </tbody>
                        }
                        {filter === 'violate' &&
                            <tbody>
                                {violateProducts.map((p) => (
                                <tr key={p.id} className="border-b-[0.01rem] text-center">
                                    <td className="px-4 py-2">{p.name}</td>
                                    <td className="px-4 py-2">{p.variant_name}</td>
                                    <td className="px-4 py-2">{p.category_name}</td>
                                    <td className="px-4 py-2">{p.variant_price} $</td>
                                    <td className="px-4 py-2">{p.bought}</td>
                                    <td className="px-4 py-2">{p.variant_stock}</td>
                                    <td className="px-4 py-2">{p.is_active ? 'OK' : 'NOT GOOD'}</td>
                                    <td className="px-4 py-2">View</td>
                                </tr>
                                ))}
                            </tbody>
                        }
                        {filter === 'pending' &&
                            <tbody>
                                {pendingProducts.map((p) => (
                                <tr key={p.id} className="border-b-[0.01rem] text-center">
                                    <td className="px-4 py-2">{p.name}</td>
                                    <td className="px-4 py-2">{p.variant_name}</td>
                                    <td className="px-4 py-2">{p.category_name}</td>
                                    <td className="px-4 py-2">{p.variant_price} $</td>
                                    <td className="px-4 py-2">{p.bought}</td>
                                    <td className="px-4 py-2">{p.variant_stock}</td>
                                    <td className="px-4 py-2">{p.is_active ? 'OK' : 'NOT GOOD'}</td>
                                    <td className="px-4 py-2">View</td>
                                </tr>
                                ))}
                            </tbody>
                        }
                    </table>
                )}
            </div>
        </>
    );
};

export default AllProductSection;