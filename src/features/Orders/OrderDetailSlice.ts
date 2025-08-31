import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderById } from "../../api";

export const fetchOrderDetail = createAsyncThunk(
  "orderDetail/fetchOrderDetail",
  async (orderId: number, thunkAPI) => {
    try {
        const response = await getOrderById(orderId);
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

// For a single log entry in the order's history
export interface OrderLog {
    status: string;
    timestamp: string;
    storage_location: string | null;
    shipper_name: string | null;
}

// For the shipping address details
export interface ShippingAddress {
    full_name: string;
    phone_number: string;
    address_line1: string;
    address_line2: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
}

// The main interface for the entire order object
export interface OrderDetails {
    order_id: number;
    order_status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | 'failed';
    created_at: string;
    total_paid: string;
    store: Store;
    shipping_address: ShippingAddress;
    order_logs: OrderLog[];
    products: OrderProduct[];
}

interface OrderDetailState {
    order: OrderDetails | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: OrderDetailState = {
    order: null,
    status: 'idle',
    error: null,
};


const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.order = action.payload;
            })
            .addCase(fetchOrderDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default orderDetailSlice.reducer;
