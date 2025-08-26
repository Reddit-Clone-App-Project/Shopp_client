import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStoreProducts, getAllProductsByStoreId } from "../../api";
import { AllProducts } from "../../types/Item";

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

export const fetchProductsByStoreId = createAsyncThunk(
  'store/fetchProductsByStoreId',
  async ({ storeId, limit, offset }: { storeId: number; limit: number; offset: number }, thunkAPI) => {
    try {
      const response = await getAllProductsByStoreId(storeId, limit, offset);
      console.log('API response:', response.data);
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
    allProducts: AllProducts[];
    status: {
        fetchStoreProducts: "idle" | "loading" | "succeeded" | "failed";
        fetchProductsByStoreId: "idle" | "loading" | "succeeded" | "failed"; 
    },
    error: string | null;
}

const initialState: StoreProductsState = {
    products: [],
    allProducts: [],
    status: {
        fetchStoreProducts: 'idle',
        fetchProductsByStoreId: 'idle',
    },
    error: null,
};

export const storeProductsSlice = createSlice({
    name: "storeProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStoreProducts.pending, (state) => {
                state.status.fetchStoreProducts = "loading";
            })
            .addCase(fetchStoreProducts.fulfilled, (state, action) => {
                state.status.fetchStoreProducts = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchStoreProducts.rejected, (state, action) => {
                if(action.meta.aborted) {
                    return;
                }

                state.status.fetchStoreProducts = "failed";
                state.error = action.payload as string;
            })
            .addCase(fetchProductsByStoreId.pending, (state) => {
                state.status.fetchProductsByStoreId = 'loading';
                state.error = null;
            })
            .addCase(fetchProductsByStoreId.fulfilled, (state, action) => {
                console.log('Reducer payload:', action.payload);
                state.status.fetchProductsByStoreId = 'succeeded';
                state.allProducts = action.payload;
            })
            .addCase(fetchProductsByStoreId.rejected, (state, action) => {
                if (action.meta.aborted) {
                    return;
                }
                state.status.fetchProductsByStoreId = 'failed';
                state.error = (action.payload as string) ?? 'Request Failed';
            })
    },
});

export default storeProductsSlice.reducer;