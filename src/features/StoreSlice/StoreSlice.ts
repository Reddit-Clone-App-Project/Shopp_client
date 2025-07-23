import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getStore, getStoreOwned } from "../../api";
import { StoreType } from '../../types/Item';

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

export const fetchStoreOwned = createAsyncThunk(
  'store/fetchStoreOwned',
  async (_: void, thunkAPI) => {
    try {
      const response = await getStoreOwned();
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
  stores: StoreType[];
  selectedStoreId: number | null,
  status: {
    fetchStore: "idle" | "loading" | "succeeded" | "failed";
    fetchStoreOwned: "idle" | "loading" | "succeeded" | "failed";
  },
  error: string | null;
}

const initialState: StoreState = {
  store: null,
  stores: [],
  selectedStoreId: null,
  status: {
    fetchStore: "idle",
    fetchStoreOwned: "idle",
  },
  error: null,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setSelectedStoreId(state, action: PayloadAction<number>) {
      state.selectedStoreId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStore.pending, (state) => {
        state.status.fetchStore = "loading";
        state.error = null;
      })
      .addCase(fetchStore.fulfilled, (state, action) => {
        state.status.fetchStore = "succeeded";
        state.store = action.payload;
      })
      .addCase(fetchStore.rejected, (state, action) => {
        state.status.fetchStore = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchStoreOwned.pending, (state) => {
        state.status.fetchStoreOwned = 'loading';
      })
      .addCase(fetchStoreOwned.fulfilled, (state, action: PayloadAction<StoreType[]>) => {
        state.status.fetchStoreOwned = 'succeeded';
        state.stores = action.payload;
      })
      .addCase(fetchStoreOwned.rejected, (state, action) => {
        state.status.fetchStoreOwned = 'failed';
        state.error = action.payload as string;
      })
  },
});

export const { setSelectedStoreId } = storeSlice.actions;
export default storeSlice.reducer;