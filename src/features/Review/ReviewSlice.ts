import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsReview, getProductsReviewByStars, getProductsReviewByComment, getProductsReviewByImage } from "../../api";

export const fetchProductsReview = createAsyncThunk(
  "review/fetchProductsReview",
  async ({ productId, offset }: { productId: number; offset: number }, thunkAPI) => {
    try {
        const response = await getProductsReview(productId, offset);
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

export const fetchProductsReviewByStars = createAsyncThunk(
  "review/fetchProductsReviewByStars",
    async ({ productId, stars, offset }: { productId: number; stars: number; offset: number }, thunkAPI) => {
        try {
            const response = await getProductsReviewByStars(productId, stars, offset);
            return { star: stars, data: response.data };
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const fetchProductsReviewByComment = createAsyncThunk(
  "review/fetchProductsReviewByComment",
    async ({ productId, offset }: { productId: number; offset: number }, thunkAPI) => {
        try {
            const response = await getProductsReviewByComment(productId, offset);
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

export const fetchProductsReviewByImage = createAsyncThunk(
  "review/fetchProductsReviewByImage",
    async ({ productId, offset }: { productId: number; offset: number }, thunkAPI) => {
        try {
            const response = await getProductsReviewByImage(productId, offset);
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

interface ReviewState {
  reviews: any[];
  reviews_5_stars: any[];
  reviews_4_stars: any[];
  reviews_3_stars: any[];
  reviews_2_stars: any[];
  reviews_1_stars: any[];
  reviews_have_comment: any[];
  reviews_have_image: any[];
  offset: number;
  offset_5_stars: number;
  offset_4_stars: number;
  offset_3_stars: number;
  offset_2_stars: number;
  offset_1_stars: number;
  offset_have_comment: number;
  offset_have_image: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  reviews_5_stars: [],
  reviews_4_stars: [],
  reviews_3_stars: [],
  reviews_2_stars: [],
  reviews_1_stars: [],
  reviews_have_comment: [],
  reviews_have_image: [],
  offset: 0,
  offset_5_stars: 0,
  offset_4_stars: 0,
  offset_3_stars: 0,
  offset_2_stars: 0,
  offset_1_stars: 0,
  offset_have_comment: 0,
  offset_have_image: 0,
  status: "idle",
  error: null,
};

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsReview.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProductsReview.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.offset += 25; // Increment offset by 25 for the next fetch
                state.reviews = state.reviews.concat(action.payload);
            })
            .addCase(fetchProductsReview.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(fetchProductsReviewByStars.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProductsReviewByStars.fulfilled, (state, action) => {
                state.status = "succeeded";
                switch (action.payload.star) {
                    case 5:
                        state.reviews_5_stars = state.reviews_5_stars.concat(action.payload.data);
                        state.offset_5_stars += 25;
                        break;
                    case 4:
                        state.reviews_4_stars = state.reviews_4_stars.concat(action.payload.data);
                        state.offset_4_stars += 25;
                        break;
                    case 3:
                        state.reviews_3_stars = state.reviews_3_stars.concat(action.payload.data);
                        state.offset_3_stars += 25;
                        break;
                    case 2:
                        state.reviews_2_stars = state.reviews_2_stars.concat(action.payload.data);
                        state.offset_2_stars += 25;
                        break;
                    case 1:
                        state.reviews_1_stars = state.reviews_1_stars.concat(action.payload.data);
                        state.offset_1_stars += 25;
                        break;
                }
            })
            .addCase(fetchProductsReviewByStars.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(fetchProductsReviewByComment.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProductsReviewByComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.offset_have_comment += 25; // Increment offset by 25 for the next fetch
                state.reviews_have_comment = state.reviews_have_comment.concat(action.payload);
            })
            .addCase(fetchProductsReviewByComment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(fetchProductsReviewByImage.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProductsReviewByImage.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.offset_have_image += 25; // Increment offset by 25 for the next fetch
                state.reviews_have_image = state.reviews_have_image.concat(action.payload);
            })
            .addCase(fetchProductsReviewByImage.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export default reviewSlice.reducer;
