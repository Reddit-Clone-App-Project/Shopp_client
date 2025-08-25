import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { addANewAddress, deleteAddress, getBuyerAddress, setAddressToDefault, updateAddress } from "../../api";
import { PostBuyerAddress, UpdateBuyerAddress } from "../../types/buyerAddress";

export const fetchBuyerAddress = createAsyncThunk(
  "buyerAddress/fetchBuyerAddress",
    async (_, thunkAPI) => {
        try {
        const response = await getBuyerAddress();
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

export const postAnAddress = createAsyncThunk(
    "buyerAddress/postAnAddress",
    async (addressData: PostBuyerAddress, thunkAPI) => {
        try {
            const response = await addANewAddress(addressData);
            return response.data;
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const putAnAddress = createAsyncThunk(
    "buyerAddress/putAnAddress",
    async ({ id, addressData }: { id: number; addressData: UpdateBuyerAddress }, thunkAPI) => {
        try {
            const response = await updateAddress(id, addressData);
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

export const setAddressDefault = createAsyncThunk(
    "buyerAddress/setAddressDefault",
    async (id: number, thunkAPI) => {
        try {
            const response = await setAddressToDefault(id);
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

export const removeAnAddress = createAsyncThunk(
    "buyerAddress/removeAnAddress",
    async (id: number, thunkAPI) => {
        try {
            const response = await deleteAddress(id);
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

export interface BuyerAddress{
    id: number;
    full_name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
    phone_number: string;
    is_default: boolean;
}

export interface BuyerAddressState {
    addresses: BuyerAddress[] | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: BuyerAddressState = {
    addresses: null,
    status: "idle",
    error: null
};

const buyerAddressSlice = createSlice({
    name: "buyerAddress",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(removeAnAddress.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.addresses = state.addresses?.filter(address => address.id !== action.payload.id) || null;
            })
            .addMatcher(isPending(fetchBuyerAddress, postAnAddress, putAnAddress, setAddressDefault, removeAnAddress), (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addMatcher(isFulfilled(fetchBuyerAddress, postAnAddress, putAnAddress, setAddressDefault), (state, action) => {
                state.status = "succeeded";
                state.addresses = action.payload;
            })
            .addMatcher(isRejected(fetchBuyerAddress, postAnAddress, putAnAddress, setAddressDefault, removeAnAddress), (state, action) => {
                if (action.meta.aborted) {
                    return;
                }

                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export default buyerAddressSlice.reducer;
