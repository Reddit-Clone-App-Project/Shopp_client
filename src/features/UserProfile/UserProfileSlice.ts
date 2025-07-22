import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "../../api";

export const handleGetProfile = createAsyncThunk(
    'profile/handleGetProfile',
    async (_ , thunkAPI) => {
        try {
            const res = await getProfile();
            if(res?.data?.id){
                return res.data;
            }
            return thunkAPI.rejectWithValue('Get profile failed: Invalid response from the server.');
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.response?.data?.error || "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export interface Profile {
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
    user: {
        id: number,
        email: string,
        full_name: string,
        profile_img: string,
        date_of_birth: Date,
        role: "buyer" | "seller",
        phone_number: string,
        nationality: string,
        username: string
    } | null
}

export const initialState: Profile = {
    status: 'idle',
    error: null,
    user: null
}

const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {  
        deleteProfile: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(handleGetProfile.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(handleGetProfile.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        })
        .addCase(handleGetProfile.rejected, (state, action) => {
            state.status = 'failed';
            state.user = null;
            state.error = action.payload as string;
        })
    }
})

export const { deleteProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;