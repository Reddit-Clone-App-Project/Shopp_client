import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBuyerCart, addProductToCart, removeProductFromCart } from "../../api";

export const fetchBuyerCart = createAsyncThunk(
    'cart/fetchBuyerCart',
    async (_, thunkAPI) => {
        try {
            const response = await getBuyerCart();
            return response.data;
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error || error.response?.data?.message || 'Failed to fetch cart';
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productVariantId, quantity, priceAtPurchase } : { productVariantId: number, quantity: number, priceAtPurchase: number }, thunkAPI) => {
        try {
            const response = await addProductToCart(productVariantId, quantity, priceAtPurchase);
            return response.data;
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error || error.response?.data?.message || 'Failed to add product to cart';
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productVariantId: number, thunkAPI) => {
        try {
            const response = await removeProductFromCart(productVariantId);
            return response.data;
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error || error.response?.data?.message || 'Failed to remove product from cart';
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

interface CartState {
    cart: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CartState = {
    cart: [],
    status: 'idle',
    error: null,
};

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBuyerCart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchBuyerCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart = action.payload.items;
            })
            .addCase(fetchBuyerCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(addToCart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart = action.payload.items;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart = action.payload.items;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export const { clearCart } = CartSlice.actions;
export default CartSlice.reducer;