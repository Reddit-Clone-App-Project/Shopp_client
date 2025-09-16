import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStoreOrders } from "../../api";

export const fetchAllStoreOrders = createAsyncThunk(
    "storeOrders/fetchAllStoreOrders",
    async (storeId: number, thunkAPI) => {
        try {
            const res = await getAllStoreOrders(storeId);
            return res.data;
        } catch (err: any) {
            const errorMsg =
                err.response?.data?.error 
                || err.response?.data?.message
                || "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export interface StoreOrder {
  id: number;
  username: string;
  status: string; 
  total_without_shipping: string;
  shipping_id: number;
  shipping_unit: string | null;
  shipping_method: string;
  products: Product[];
}

export interface Product {
  name: string;
  variants: Variant[];
}

export interface Variant {
  id: number;
  name: string;
  price: number;
  quantity: number;
  price_at_purchase: number;
}

interface StoreOrdersState {
  orders: StoreOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StoreOrdersState = {
  orders: [],
  status: 'idle',
  error: null,
};

const StoreOrdersSlice = createSlice({
    name: 'storeOrders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllStoreOrders.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllStoreOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchAllStoreOrders.rejected, (state, action) => {
                if (action.meta.aborted) {
                    return;
                }
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export default StoreOrdersSlice.reducer;