import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductById } from '../../api'; // Import your API function
import { Item } from '../../types/Item';    // Ensure this path is correct

export const fetchProductById = createAsyncThunk(
  'productDetail/fetchProductById',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await getProductById(productId);
      return response.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Failed to fetch product';
      return rejectWithValue(errorMsg);
    }
  }
);

interface ProductDetailState {
  product: Item | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductDetailState = {
  product: null,
  status: 'idle',
  error: null,
};

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearProduct } = productDetailSlice.actions;
export default productDetailSlice.reducer;