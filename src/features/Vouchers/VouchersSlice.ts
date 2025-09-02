import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVouchersByUserId } from "../../api";

export const fetchVouchersForBuyer = createAsyncThunk(
  "vouchers/fetchForBuyer",
  async (
    { limit = 0, offset = 0 }: { limit: number; offset: number },
    thunkAPI
  ) => {
    try {
      const response = await getVouchersByUserId(limit, offset);
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

interface Voucher {
  id: number;
  name: string;
  discount_type: "percentage" | "fixed";
  discount_value: string;
  start_at: Date;
  end_at: Date;
  status: "active" | "paused" | "ended" | "upcoming";
  description: string;
  discount_where: "active" | "paused" | "ended" | "upcoming";
  quantity: number;
}

interface VouchersState {
  vouchers: Voucher[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: VouchersState = {
  vouchers: [],
  status: "idle",
  error: null,
};

const voucherSlice = createSlice({
  name: "vouchers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchersForBuyer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVouchersForBuyer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vouchers = action.payload;
      })
      .addCase(fetchVouchersForBuyer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default voucherSlice.reducer;
