import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStoreProducts } from "../../api";

export const fetchStoreProducts = createAsyncThunk(
    "storeProducts/fetchStoreProducts",
    async ({ storeId, limit, offset }: { storeId: number; limit: number; offset: number }, thunkAPI) => {
        try {
            const response = await getStoreProducts(storeId, limit, offset);
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

export interface StoreProductsState {
    products: any[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: StoreProductsState = {
    products: [],
    status: "idle",
    error: null,
};

export const storeProductsSlice = createSlice({
    name: "storeProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStoreProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStoreProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchStoreProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default storeProductsSlice.reducer;