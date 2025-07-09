import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHot } from "../../api";

export const fetchSuggestionOfTheDay = createAsyncThunk(
  "suggestionOfTheDay/fetchSuggestionOfTheDay",
  async (offset: number, thunkAPI) => {
    try {
      const response = await getHot(offset);
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

export interface SuggestionOfTheDayState {
  products: any[];
  offset: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SuggestionOfTheDayState = {
  products: [],
  offset: 0,
  status: "idle",
  error: null,
};

const SuggestionOfTheDaySlice = createSlice({
  name: "suggestionOfTheDay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestionOfTheDay.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSuggestionOfTheDay.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offset += 20; // Increment offset by 20 for the next fetch
        state.products = state.products.concat(action.payload);
      })
      .addCase(fetchSuggestionOfTheDay.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default SuggestionOfTheDaySlice.reducer;