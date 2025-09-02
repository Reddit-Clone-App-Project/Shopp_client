import { createSlice, createAsyncThunk, isPending, isRejected } from "@reduxjs/toolkit";
import { getWishlistDetail, addProductToWishlist, removeProductFromWishlist } from "../../api";

export const fetchWishlistDetail = createAsyncThunk(
    'wishlist/fetchWishlistDetail',
    async (id: number, thunkAPI) => {
        try {
            const response = await getWishlistDetail(id);
            return response.data;
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const postProductToWishlist = createAsyncThunk(
    'wishlist/postProductToWishlist',
    async ({ wishlistId, productId }: { wishlistId: number; productId: number }, thunkAPI) => {
        try {
            const response = await addProductToWishlist(wishlistId, productId);
            return response.data;
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const deleteProductFromWishlist = createAsyncThunk(
    'wishlist/deleteProductFromWishlist',
    async ({ wishlistId, productId }: { wishlistId: number; productId: number }, thunkAPI) => {
        try {
            await removeProductFromWishlist(wishlistId, productId);
            return { wishlistId, productId };
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

// For the promotion image of a product in the wishlist
export interface WishlistProductImage {
    id: number;
    url: string;
    alt_text: string | null;
}

// For the price range of a product's variants
export interface PriceRange {
    min_price: number | null;
    max_price: number | null;
}

// For a single product entry within the wishlist
export interface WishlistProduct {
    id: number;
    name: string;
    promotion_image: WishlistProductImage | null;
    price_range: PriceRange;
}

// The main interface for the entire wishlist object
export interface WishlistDetail {
    wishlist_id: number;
    wishlist_name: string;
    products: WishlistProduct[];
}

interface WishlistDetailState {
    wishlist: WishlistDetail | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: WishlistDetailState = {
    wishlist: null,
    status: 'idle',
    error: null
}

const wishlistDetailSlice = createSlice({
    name: 'wishlistDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlistDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.wishlist = action.payload;
            })
            .addCase(postProductToWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.wishlist) {
                    state.wishlist.products.push(action.payload);
                }
            })
            .addCase(deleteProductFromWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.wishlist) {
                    state.wishlist.products = state.wishlist.products.filter(product => product.id !== action.payload.productId);
                }
            })
            .addMatcher(isPending(fetchWishlistDetail, postProductToWishlist, deleteProductFromWishlist), (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addMatcher(isRejected(fetchWishlistDetail, postProductToWishlist, deleteProductFromWishlist), (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
})

export default wishlistDetailSlice.reducer;