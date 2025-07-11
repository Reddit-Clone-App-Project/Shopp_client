import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStore } from "../../api";

export const fetchStore = createAsyncThunk(
  "store/fetchStore",
  async (storeId: number, thunkAPI) => {
    try {
      const response = await getStore(storeId);
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

export interface StoreState {
  store: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StoreState = {
  store: null,
  status: "idle",
  error: null,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStore.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStore.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.store = action.payload;
      })
      .addCase(fetchStore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default storeSlice.reducer;