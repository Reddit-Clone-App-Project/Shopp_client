import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getOrders, removeOrderById } from "../../api";

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders", 
    async (_, thunkAPI) => {
        try {
            const response = await getOrders();
            return response.data;
            
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const deleteOrderById = createAsyncThunk(
    "orders/deleteOrderById",
    async (orderId: number, thunkAPI) => {
        try {
            await removeOrderById(orderId);
            return orderId;
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

// For the individual items within a product
export interface OrderVariant {
    variant_id: number;
    variant_name: string;
    quantity: number;
    price_at_purchase: number;
    image_url: string;
}

// For the products within an order
export interface OrderProduct {
    product_id: number;
    product_name: string;
    variants: OrderVariant[];
}

// For the store information
export interface Store {
    id: number;
    name: string;
    profile_img: string | null;
}

// For the current status of the order
export interface CurrentStatus {
    status: string;
    timestamp: string;
    storage_location: string | null;
    shipper_name: string | null;
}

// The main interface for the entire order object
export interface Order {
    order_id: number;
    order_status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | 'failed';
    created_at: string;
    total_paid: string;
    store: Store;
    current_status: CurrentStatus;
    products: OrderProduct[];
}

interface OrderState {
    orders: Order[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    status: 'idle',
    error: null
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(deleteOrderById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = state.orders.filter(order => order.order_id !== action.payload);
            })
            .addMatcher(isPending(fetchOrders, deleteOrderById), (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addMatcher(isRejected(fetchOrders, deleteOrderById), (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});


export default ordersSlice.reducer;
