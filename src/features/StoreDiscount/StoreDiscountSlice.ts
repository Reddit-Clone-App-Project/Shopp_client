import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStoreReleasedRuledDiscounts } from "../../api";

export const fetchStoreDiscounts = createAsyncThunk(
    "storeDiscount/fetchStoreDiscounts",
    async (storeId: number, thunkAPI) => {
        try {
            const response = await getStoreReleasedRuledDiscounts(storeId);
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

export interface StoreDiscountState {
    discounts: any[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: StoreDiscountState = {
    discounts: [],
    status: "idle",
    error: null,
};

const StoreDiscountSlice = createSlice({
    name: "storeDiscount",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStoreDiscounts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchStoreDiscounts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.discounts = action.payload; // Assuming the payload is an array of discounts
            })
            .addCase(fetchStoreDiscounts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default StoreDiscountSlice.reducer;
