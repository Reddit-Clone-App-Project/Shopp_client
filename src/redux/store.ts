import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/Auth/AuthSlice';
import profile from '../features/UserProfile/UserProfileSlice';
import suggestionOfTheDay from '../features/SuggestionOfTheDay/SuggestionOfTheDaySlice';
import buyerAddress from '../features/BuyerAddress/BuyerAddressSlice';
import storeProfile from '../features/StoreSlice/StoreSlice';
import review from '../features/Review/ReviewSlice';
import discount from '../features/StoreDiscount/StoreDiscountSlice';
import storeProducts from '../features/StoreProducts/StoreProductSlice';
import storeHotProducts from '../features/StoreHotProduct/StoreHotProductSlice';
import search from '../features/Search/SearchSlice';
import category from '../features/Category/CategorySlice';
import categoryProducts from '../features/Category/CategoryProductsSlice';
import stores from '../features/StoreSlice/StoreSlice';
import productDetail from '../features/ProductDetail/ProductDetailSlice'; 
import cart from '../features/Cart/CartSlice';
import orders from "../features/Orders/OrdersSlice"
import orderDetail from "../features/Orders/OrderDetailSlice"
import notification from "../features/Notification/NotificationSlice";
import vouchers from "../features/Vouchers/VouchersSlice";
import wishlist from "../features/Wishlist/WishlistSlice";
import wishlistDetail from "../features/Wishlist/WishlistDetailSlice";

export const store = configureStore({
    reducer: {
        auth,
        profile,
        suggestionOfTheDay,
        buyerAddress,
        storeProfile,
        review,
        discount,
        storeProducts,
        storeHotProducts,
        search,
        category,
        categoryProducts,
        stores,
        productDetail,
        cart,
        orders,
        orderDetail,
        notification,
        vouchers,
        wishlist,
        wishlistDetail
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;