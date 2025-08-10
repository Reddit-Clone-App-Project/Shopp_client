import {
  createSlice,
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import {
  getBuyerCart,
  addProductToCart,
  removeProductFromCart,
} from "../../api";

export const fetchBuyerCart = createAsyncThunk(
  "cart/fetchBuyerCart",
  async (_, thunkAPI) => {
    try {
      const response = await getBuyerCart();
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to fetch cart";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    {
      productVariantId,
      quantity,
      priceAtPurchase,
    }: { productVariantId: number; quantity: number; priceAtPurchase: number },
    thunkAPI
  ) => {
    try {
      const response = await addProductToCart(
        productVariantId,
        quantity,
        priceAtPurchase
      );
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to add product to cart";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productVariantId: number, thunkAPI) => {
    try {
      const response = await removeProductFromCart(productVariantId);
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to remove product from cart";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

interface CartState {
  cart: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  cart: [],
  status: "idle",
  error: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending states for all cart async thunks
      .addMatcher(
        isPending(fetchBuyerCart, addToCart, removeFromCart),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      // Handle fulfilled states for all cart async thunks
      .addMatcher(
        isFulfilled(fetchBuyerCart, addToCart, removeFromCart),
        (state, action) => {
          state.status = "succeeded";
          // Update cart with items from response
          if (action.payload?.items) {
            state.cart = action.payload.items;
          }
        }
      )
      // Handle rejected states for all cart async thunks
      .addMatcher(
        isRejected(fetchBuyerCart, addToCart, removeFromCart),
        (state, action) => {
          if (action.meta.aborted) {
            return;
          }
            
          state.status = "failed";
          state.error = action.payload as string;
        }
      );
  },
});

export const { clearCart } = CartSlice.actions;
export default CartSlice.reducer;
