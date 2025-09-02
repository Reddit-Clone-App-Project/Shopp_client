import { createSlice, createAsyncThunk, isPending, isRejected } from "@reduxjs/toolkit";
import { getWishlists, createWishlist, deleteWishlist } from "../../api";

export const fetchWishlists = createAsyncThunk(
    'wishlist/fetchWishlists',
    async (_, thunkAPI) => {
        try {
            const response = await getWishlists();
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

export const postWishlist = createAsyncThunk(
    'wishlist/postWishlist',
    async (name: string, thunkAPI) => {
        try {
            const response = await createWishlist(name);
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

export const deleteWishlistThunk = createAsyncThunk(
    'wishlist/deleteWishlist',
    async (id: number, thunkAPI) => {
        try {
            await deleteWishlist(id);
            return { id };
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

interface Wishlist {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

interface WishlistState {
    wishlists: Wishlist[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: WishlistState = {
    wishlists: [],
    status: 'idle',
    error: null
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlists.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.wishlists = action.payload;
            })
            .addCase(postWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.wishlists.push(action.payload);
            })
            .addCase(deleteWishlistThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.wishlists = state.wishlists.filter(wishlist => wishlist.id !== action.payload.id);
            })
            .addMatcher(isPending(fetchWishlists, postWishlist, deleteWishlistThunk), (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addMatcher(isRejected(fetchWishlists, postWishlist, deleteWishlistThunk), (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
})

export default wishlistSlice.reducer;