import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getYourStore } from "../../api";

export const fetchYourStore = createAsyncThunk(
  "sellerStore/fetchYourStore",
  async (_, thunkAPI) => {
    try {
        const response = await getYourStore();
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

export interface SellerStoreState {
  store: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SellerStoreState = {
  store: null,
  status: 'idle',
  error: null,
};

export const sellerStoreSlice = createSlice({
  name: "sellerStore",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchYourStore.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchYourStore.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.store = action.payload;
      })
      .addCase(fetchYourStore.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default sellerStoreSlice.reducer;
