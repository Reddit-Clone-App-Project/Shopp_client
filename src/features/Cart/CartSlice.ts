import {
  createSlice,
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  getBuyerCart,
  addProductToCart,
  removeProductFromCart,
  removeAllProductsFromCart,
  updateCartItemQuantity,
} from "../../api";

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      await removeAllProductsFromCart();
      return;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to clear cart";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

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

export const updateProductQuantityInCart = createAsyncThunk(
  "cart/updateProductQuantityInCart",
  async (
    {
      productVariantId,
      quantity,
    }: { productVariantId: number; quantity: number },
    thunkAPI
  ) => {
    try {
      const response = await updateCartItemQuantity(productVariantId, quantity);
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update product quantity in cart";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

interface CartItem {
  product_variant_id: number;
  product_name: string;
  variant_name: string;
  quantity: number;
  price_at_purchase: number;
  image_url: string;
}

interface CartStore {
  store_id: number;
  store_name: string;
  store_express_shipping: boolean;
  store_fast_shipping: boolean;
  store_economical_shipping: boolean;
  store_bulky_shipping: boolean;
  items: CartItem[];
}

export interface CartData {
  cart_id: number;
  app_user_id: number;
  stores: CartStore[];
}

interface CartState {
  cart: CartData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedItems: number[];
  storeShippingMethods: {
    [storeId: number]: "express" | "fast" | "economical" | "bulky";
  };
}

const initialState: CartState = {
  cart: null,
  status: "idle",
  error: null,
  selectedItems: [],
  storeShippingMethods: {},
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleSelectItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const isSelected = state.selectedItems.includes(itemId);

      if (isSelected) {
        state.selectedItems = state.selectedItems.filter((id) => id !== itemId);
      } else {
        state.selectedItems.push(itemId);
      }
    },

    toggleSelectStore: (state, action: PayloadAction<number>) => {
      const storeId = action.payload;
      const store = state.cart?.stores.find((s) => s.store_id === storeId);

      if (!store) return;

      const storeItemIds = store.items.map((item) => item.product_variant_id);
      const areAllSelected = storeItemIds.every((id) =>
        state.selectedItems.includes(id)
      );

      if (areAllSelected) {
        state.selectedItems = state.selectedItems.filter(
          (id) => !storeItemIds.includes(id)
        );
      } else {
        storeItemIds.forEach((id) => {
          if (!state.selectedItems.includes(id)) {
            state.selectedItems.push(id);
          }
        });
      }
    },

    toggleSelectAll: (state) => {
      if (!state.cart) return;
      const allItemIds = state.cart.stores.flatMap((store) =>
        store.items.map((item) => item.product_variant_id)
      );

      if (state.selectedItems.length === allItemIds.length) {
        state.selectedItems = [];
      } else {
        state.selectedItems = allItemIds;
      }
    },

    // This is use after finishing payment
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },

    setStoreShippingMethod: (
      state,
      action: PayloadAction<{
        storeId: number;
        shippingMethod: "express" | "fast" | "economical" | "bulky";
      }>
    ) => {
      const { storeId, shippingMethod } = action.payload;
      state.storeShippingMethods[storeId] = shippingMethod;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle specific case for clearCart.fulfilled (addCase must come before addMatcher)
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.cart = null;
        state.selectedItems = [];
        state.error = null;
      })
      // Handle pending states for all cart async thunks
      .addMatcher(
        isPending(
          fetchBuyerCart,
          addToCart,
          removeFromCart,
          clearCart,
          updateProductQuantityInCart
        ),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      // Handle fulfilled states for all cart async thunks
      .addMatcher(
        isFulfilled(
          fetchBuyerCart,
          addToCart,
          removeFromCart,
          updateProductQuantityInCart
        ),
        (state, action) => {
          state.status = "succeeded";
          // Update cart with items from response
          state.cart = action.payload;
        }
      )
      // Handle rejected states for all cart async thunks
      .addMatcher(
        isRejected(
          fetchBuyerCart,
          addToCart,
          removeFromCart,
          clearCart,
          updateProductQuantityInCart
        ),
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

export const {
  toggleSelectItem,
  toggleSelectStore,
  toggleSelectAll,
  clearSelectedItems,
  setStoreShippingMethod,
} = CartSlice.actions;
export default CartSlice.reducer;
