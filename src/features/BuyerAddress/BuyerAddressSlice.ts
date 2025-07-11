import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBuyerAddress } from "../../api";

export const fetchBuyerAddress = createAsyncThunk(
  "buyerAddress/fetchBuyerAddress",
    async (_, thunkAPI) => {
        try {
        const response = await getBuyerAddress();
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

export interface BuyerAddressState {
    address: any | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: BuyerAddressState = {
    address: null,
    status: "idle",
    error: null
};

const buyerAddressSlice = createSlice({
    name: "buyerAddress",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBuyerAddress.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBuyerAddress.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.address = action.payload;
            })
            .addCase(fetchBuyerAddress.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export default buyerAddressSlice.reducer;
