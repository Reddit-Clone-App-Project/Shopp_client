import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchByCategory } from "../../api";

export const fetchCategoryProducts = createAsyncThunk(
    'category/fetchCategoryProducts',
    async ({ categoryId, limit, offset, sortBy, minPrice, maxPrice, rating }: { categoryId: number; limit?: number; offset?: number; sortBy?: string; minPrice?: number | null; maxPrice?: number | null; rating?: number | null }, thunkAPI) => {
        try {
            const response = await searchByCategory(categoryId, limit, offset, sortBy, minPrice, maxPrice, rating);
            return { categoryId, results: response.data };
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "A network or server error occurred.";
            return thunkAPI.rejectWithValue({ error: errorMsg });
        }
    }
);

export interface CategoryProductsState {
    results: any[];
    categoryId: number;
    offset: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CategoryProductsState = {
    results: [],
    categoryId: 0,
    offset: 0,
    status: 'idle',
    error: null
};

const CategoryProductsSlice = createSlice({
    name: 'categoryProducts',
    initialState,
    reducers: {
        clearCategoryProducts: (state) => {
            state.results = [];
            state.categoryId = 0;
            state.offset = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.categoryId === action.payload.categoryId) {
                    state.offset += 60; // Increment offset by 60 for the next fetch
                    state.results = state.results.concat(action.payload.results);
                } else {
                    state.categoryId = action.payload.categoryId;
                    state.offset = 60; // Reset offset for new category
                    state.results = action.payload.results;
                }
            })
            .addCase(fetchCategoryProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { clearCategoryProducts } = CategoryProductsSlice.actions;
export default CategoryProductsSlice.reducer;