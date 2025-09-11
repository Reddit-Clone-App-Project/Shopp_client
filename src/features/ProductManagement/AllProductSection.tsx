import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchProductsByStoreId } from "../StoreProducts/StoreProductSlice";
import { Link } from "react-router-dom";
import CategoryFilter from "../../components/CategoryFilter";
import { Categories } from "../../components/MockCategories";
import database from '../../assets/Database.svg';
import sortImg from '../../assets/Sort.svg';

const AllProductSection = () => {
    const [filter, setFilter] = useState<'all' | 'active' | 'violate' | 'pending'>('all');
    const [limit, setLimit] = useState(50);
    const [offset, setOffset] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchDraft, setSearchDraft] = useState('');
    const [categoryDraft, setCategoryDraft] = useState('');
    const [sortKey, setSortKey] = useState<'default' | 'name' | 'variant' | 'category' | 'price' | 'sales' | 'stock'>('default');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const dispatch = useDispatch<AppDispatch>();
    const storeId = useSelector((state: RootState) => state.sellerStore.store?.id); 
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const { allProducts, status, error } = useSelector((state: RootState) => state.storeProducts);
    const loading = status.fetchProductsByStoreId === 'loading';

    const categories = Categories;
    

    useEffect(() => {
        if (token && storeId) {                                    
            dispatch(fetchProductsByStoreId({storeId, limit, offset}));
        }
    }, [dispatch, token, storeId, limit, offset]);

    const filteredState = (state: "all" | "active" | "violate" | "pending") => {
        setFilter(state); 
    };
  
    const searchFilter = (inputText: string, category?: string) => {
        setSearchValue(inputText);
        setCategoryFilter(category ?? categoryFilter);
    };

    const sortingArray = (key: typeof sortKey) => {
        if (key === sortKey) {
            setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const displayedProducts = useMemo(() => {
        let base =
            filter === 'active'
                ? allProducts.filter(p => p.is_active === true) : filter === 'violate'
                ? allProducts.filter(p => p.is_active === false && p.is_published == true) : filter === 'pending'
                ? allProducts.filter(p => p.is_published === false && p.is_active === false) : allProducts;

        const s = searchValue.trim().toLowerCase();
        const c = categoryFilter.trim().toLowerCase();
        if (s || c) {
            base = base.filter(p => 
                (s &&
                    ((p.name ?? '').toLowerCase().includes(s) ||
                    (p.variant_sku ?? '').toLowerCase().includes(s) ||
                    String(p.id).includes(s))) ||
                (c && (p.category_name ?? '').toLowerCase().includes(c))
            );
        }

        const sorted = [...base];

        switch (sortKey) {
            case 'name':
                sorted.sort((a, b) =>
                    sortDir === 'asc'
                        ? (a.name ?? '').localeCompare(b.name ?? '')
                        : (b.name ?? '').localeCompare(a.name ?? '')
                );
                break;
            case 'category':
                sorted.sort((a, b) =>
                    sortDir === 'asc'
                        ? (a.category_name ?? '').localeCompare(b.category_name ?? '')
                        : (b.category_name ?? '').localeCompare(a.category_name ?? '')
                    );
                break;
            case 'price':
                sorted.sort((a, b) => (sortDir === 'asc' ? (a.variant_price ?? 0) - (b.variant_price ?? 0) : (b.variant_price ?? 0) - (a.variant_price ?? 0)));
                break;
            case 'sales':
                sorted.sort((a, b) => (sortDir === 'asc' ? (a.bought ?? 0) - (b.bought ?? 0) : (b.bought ?? 0) - (a.bought ?? 0)));
                break;
            case 'stock':
                sorted.sort((a, b) => (sortDir === 'asc' ? (a.variant_stock ?? 0) - (b.variant_stock ?? 0) : (b.variant_stock ?? 0) - (a.variant_stock ?? 0)));
                break;
            case 'default':
            default:
                break;
        }

        return sorted;
    }, [allProducts, filter, searchValue, categoryFilter, sortKey, sortDir]);

    const countActive   = allProducts.filter(p => p.is_active === true).length;
    const countViolate  = allProducts.filter(p => p.is_active === false && p.is_published === true).length;
    const countPending  = allProducts.filter(p => p.is_published === false && p.is_active === false).length;
    
    return (
        <>
            <header className="flex justify-between items-center">
                <h2 className="text-2xl">All Products</h2>
                <Link to='/seller/product/create' className="bg-purple-800 rounded-xl p-2 px-3 text-xl">+ Add 1 new product</Link>
            </header>
            <nav>
                <ul className="flex gap-10 mt-5 text-xl">
                    <li className={filter === 'all' ? 'text-[#A567C6] cursor-pointer underline active:underline-offset-3' : 'cursor-pointer hover:underline hover:text-[#A567C6] active:underline-offset-3'} onClick={() => filteredState('all')}>All</li>
                    <li className={filter === 'active' ? 'text-[#A567C6] cursor-pointer underline active:underline-offset-3' : 'cursor-pointer hover:underline hover:text-[#A567C6] active:underline-offset-3'} onClick={() => filteredState('active')}>Active ({countActive})</li>
                    <li className={filter === 'violate' ? 'text-[#A567C6] cursor-pointer underline active:underline-offset-3' : 'cursor-pointer hover:underline hover:text-[#A567C6] active:underline-offset-3'} onClick={() => filteredState('violate')}>Violate ({countViolate})</li>
                    <li className={filter === 'pending' ? 'text-[#A567C6] cursor-pointer underline active:underline-offset-3' : 'cursor-pointer hover:underline hover:text-[#A567C6] active:underline-offset-3'} onClick={() => filteredState('pending')}>Pending approval by Shopp ({countPending})</li>
                </ul>
            </nav>
            <div className="mt-10 bg-gray-900 p-5 rounded-xl min-h-200">
                {loading && <div>Loading Products…</div>}
                {error && <div className="text-red-500">Error: {error}</div>}
                {status.fetchProductsByStoreId === 'succeeded' && allProducts.length === 0 && (
                    <div>No product</div>
                )}
                <div className="max-w-fit flex mt-2">
                    <div className="flex border rounded-3xl px-3 py-1">
                        <p>Find product</p>
                        <input 
                            type="text" 
                            placeholder="Enter product name, product's SKU, product Id"
                            className="text-[#A6AFD8] ml-5 focus:outline-none min-w-82"
                            value={searchDraft}
                            onChange={(e) => setSearchDraft(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { 
                                setSearchValue(searchDraft.trim());
                                setCategoryFilter(categoryDraft.trim());
                            }}}
                        />
                    </div>
                    <button 
                        type="button"
                        className="ml-12 bg-gray-700 px-7 py-0.5 rounded-lg text-md h-fit self-center hover:cursor-pointer active:bg-purple-700"
                        onClick={() => {
                            setSearchValue(searchDraft.trim());
                            setCategoryFilter(categoryDraft.trim());
                        }}
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
                                value={categoryDraft}
                                onSelect={(value) => setCategoryDraft(value)}
                            />
                        </div>
                    </div>
                    <button 
                        type="button"
                        className="ml-12 bg-gray-700 px-7 py-0.5 rounded-lg text-md h-fit self-center hover:cursor-pointer active:bg-purple-700"
                        onClick={() => {
                            setSearchDraft('');
                            setCategoryDraft('');
                            setSearchValue('');
                            setCategoryFilter('');
                        }}
                    >
                        Reset
                    </button>
                </div>
                <p className="mb-3">{displayedProducts.length} products</p>
                {status.fetchProductsByStoreId === 'succeeded' && allProducts.length > 0 && (
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-700 text-center text-xl">
                                <th className="px-4 py-2 font-normal rounded-l-xl">
                                    <div className="flex justify-center">
                                        <p className="mr-2">Product's name</p>
                                        <img src={sortImg} className="cursor-pointer" onClick={() => sortingArray('name')}/>
                                    </div>
                                </th>
                                <th className="px-4 py-2 font-normal min-w-[12rem]">Variant's name</th>
                                <th className="px-4 py-2 font-normal">
                                    <div className="flex justify-center">
                                        <p className="mr-2">Category</p>
                                        <img src={sortImg} className="cursor-pointer" onClick={() => sortingArray('category')}/>
                                    </div>
                                </th>
                                <th className="px-4 py-2 font-normal min-w-[7rem]">
                                    <div className="flex justify-center">
                                        <p className="mr-2">Price</p>
                                        <img src={sortImg} className="cursor-pointer" onClick={() => sortingArray('price')}/>
                                    </div>
                                </th>
                                <th className="px-4 py-2 font-normal">
                                    <div className="flex justify-center">
                                        <p className="mr-2">Sales</p>
                                        <img src={sortImg} className="cursor-pointer" onClick={() => sortingArray('sales')}/>
                                    </div>
                                </th>
                                <th className="px-4 py-2 font-normal">
                                    <div className="flex justify-center min-w-[9rem]">
                                        <p className="mr-2">Stock quantity</p>
                                        <img src={sortImg} className="cursor-pointer" onClick={() => sortingArray('stock')}/>
                                    </div>
                                </th>
                                <th className="px-4 py-2 font-normal min-w-[11rem]">Content quality</th>
                                <th className="px-4 py-2 font-normal rounded-r-xl">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                {displayedProducts.map((p) => (
                                <tr key={p.id + '-' + p.variant_name} className="border-b-[0.01rem] text-center">
                                    <td className="px-4 py-2 h-16">{p.name}</td>
                                    <td className="px-4 py-2">{p.variant_name}</td>
                                    <td className="px-4 py-2">{p.category_name}</td>
                                    <td className="px-4 py-2">{p.variant_price} $</td>
                                    <td className="px-4 py-2">{p.bought}</td>
                                    <td className="px-4 py-2">{p.variant_stock}</td>
                                    <td className="px-4 py-2">{p.is_active ? 'Active' : 'Not Active'}</td>
                                    <td className="px-4 py-2 cursor-pointer hover:underline active:underline-offset-3">View</td>
                                </tr>
                                ))}
                            </tbody>
                    </table>
                )}
                {displayedProducts.length === 0 &&
                    <div className="mt-40">
                        <img src={database} className="m-auto my-2" />
                        <p className="text-center">No Data</p>
                    </div>
                }
            </div>
        </>
    );
};

export default AllProductSection;