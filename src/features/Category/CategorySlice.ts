import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getActiveCategories } from "../../api";

export const fetchActiveCategories = createAsyncThunk(
    'category/fetchActiveCategories',
    // Change this line
    async (_, thunkAPI) => { 
        try {
            const response = await getActiveCategories();
            return response.data;
        } catch (error: any) {
            const errorMsg =
            error.response?.data?.error || error.response?.data?.message || 'Failed to fetch active categories';
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

interface CategoryState {
    categories: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    status: 'idle',
    error: null,
};

const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        clearCategories: (state) => {
            state.categories = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActiveCategories.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchActiveCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchActiveCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { clearCategories } = CategorySlice.actions;
export default CategorySlice.reducer;
