import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchProducts } from "../../api";

export const searchProductsAsync = createAsyncThunk(
    'search/searchProducts',
    async ({ query, limit, offset }: { query: string; limit?: number; offset?: number }, thunkAPI) => {
        try {
            const response = await searchProducts(query, limit, offset);
            return { query, results: response.data };
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "A network or server error occurred.";
            return thunkAPI.rejectWithValue({ error: errorMsg });
        }
    }
);

export interface SearchState {
    results: any[];
    query: string;
    offset: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SearchState = {
    results: [],
    query: '',
    offset: 0,
    status: 'idle',
    error: null
};

const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchProductsAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(searchProductsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if(!state.query){
                    state.query = action.payload.query;
                    state.offset += 60; // Increment offset by 60 for the next fetch
                    state.results = state.results.concat(action.payload.results); // Assuming the payload is an array of search results
                }else{
                    if(state.query === action.payload.query){
                        state.offset += 60; // Increment offset by 60 for the next fetch
                        state.results = state.results.concat(action.payload.results);
                    }else{
                        state.query = action.payload.query;
                        state.offset = 60; // Reset offset to 60 for the new query
                        state.results = action.payload.results; // Replace results with new query results
                    }
                }
            })
            .addCase(searchProductsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default SearchSlice.reducer;