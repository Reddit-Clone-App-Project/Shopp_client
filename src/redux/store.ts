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
        stores
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;