import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";

import {
  getProfile,
  updateProfile,
  changePhoneNumber,
  changePassword,
  uploadAvatar,
  deleteProfile as deleteProfileApi,
  changeNotificationSettings as changeNotificationSettingsApi
} from "../../api";


export const handleGetProfile = createAsyncThunk(
  "profile/handleGetProfile",
  async (_, thunkAPI) => {
    try {
      const res = await getProfile();
      if (res?.data?.id) {
        return res.data;
      }
      return thunkAPI.rejectWithValue(
        "Get profile failed: Invalid response from the server."
      );
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.error ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const handleUpdateProfile = createAsyncThunk(
  "profile/handleUpdateProfile",
  async (profileData: any, thunkAPI) => {
    try {
      console.log(profileData);
      const res = await updateProfile(profileData);
      if (res?.data?.id) {
        return res.data;
      }
      return thunkAPI.rejectWithValue(
        "Update profile failed: Invalid response from the server."
      );
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.error ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);

    }
  }
);

export const handleChangePhoneNumber = createAsyncThunk(
  "profile/handleChangePhoneNumber",
  async (newPhoneNumber: string, thunkAPI) => {
    try {
      const res = await changePhoneNumber(newPhoneNumber);
      if (res?.data?.id) {
        return res.data;
      }
      return thunkAPI.rejectWithValue(
        "Change phone number failed: Invalid response from the server."
      );
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.error ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const handleChangePassword = createAsyncThunk(
  "profile/handleChangePassword",
  async (
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    thunkAPI
  ) => {
    try {
      const res = await changePassword(oldPassword, newPassword);
      if (res?.data?.id) {
        return res.data;
      }
      return thunkAPI.rejectWithValue(
        "Change password failed: Invalid response from the server."
      );
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.error ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);

    }
  }
);

export const handleUploadAvatar = createAsyncThunk(
  "profile/handleUploadAvatar",
  async (avatarFile: File, thunkAPI) => {
    try {
      const res = await uploadAvatar(avatarFile);
      if (res?.data?.id) {
        return res.data;
      }
      return thunkAPI.rejectWithValue(
        "Upload avatar failed: Invalid response from the server."
      );
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.error ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const handleDeleteAccount = createAsyncThunk(
  "profile/handleDeleteAccount",
  async (_, thunkAPI) => {
    try {
      await deleteProfileApi();
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.error ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const changeNotificationSettings = createAsyncThunk(
  "profile/changeNotificationSettings",
  async (settings: { email_notification: boolean; order_update: boolean; promotion_update: boolean }, thunkAPI) => {
    try {
      const res = await changeNotificationSettingsApi(settings);
      if (res?.data) {
        return res.data;
      }
      return thunkAPI.rejectWithValue(
        "Change notification settings failed: Invalid response from the server."
      );
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.error ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export interface Profile {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  user: {
    id: number;
    email: string;
    full_name: string | null;
    profile_img: string | null;
    date_of_birth: Date | string | null;
    role: "buyer" | "seller";
    phone_number: string;
    nationality: string;
    username: string;
    gender: "male" | "female" | "other" | null;
    email_notification: boolean;
    order_update: boolean;
    promotion_update: boolean;
  } | null;
}

export const initialState: Profile = {
  status: "idle",
  error: null,
  user: null,
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    deleteProfile: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleDeleteAccount.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
      })
      .addMatcher(
        isPending(
          handleGetProfile,
          handleUpdateProfile,
          handleUploadAvatar,
          handleChangePhoneNumber,
          handleDeleteAccount,
          changeNotificationSettings
        ),

        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        isFulfilled(
          handleGetProfile,
          handleUpdateProfile,
          handleUploadAvatar,
          handleChangePhoneNumber,
          changeNotificationSettings
        ),
        (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
        }
      )
      .addMatcher(
        isRejected(
          handleGetProfile,
          handleUpdateProfile,
          handleUploadAvatar,
          handleChangePhoneNumber,
          handleDeleteAccount,
          changeNotificationSettings
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

export const { deleteProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
