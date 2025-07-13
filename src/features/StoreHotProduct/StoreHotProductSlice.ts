import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStoreHotProducts } from "../../api";

export const fetchStoreHotProducts = createAsyncThunk(
    "storeHotProduct/fetchStoreHotProducts",
    async ({ storeId, limit, offset }: { storeId: number; limit: number; offset: number }, thunkAPI) => {
        try {
            const response = await getStoreHotProducts(storeId, limit, offset);
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

export interface StoreHotProductState {
    products: any[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: StoreHotProductState = {
    products: [],
    status: "idle",
    error: null,
};

export const storeHotProductSlice = createSlice({
    name: "storeHotProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStoreHotProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStoreHotProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchStoreHotProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default storeHotProductSlice.reducer;
