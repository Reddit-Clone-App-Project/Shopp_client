import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import { login, logout, getNewAccessToken } from "../../api";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: number;
  email: string;
  role: string;
}

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async ({ eOrP, password }: { eOrP: String; password: String }, thunkAPI) => {
    try {
      const res = await login(eOrP, password);
      if (res?.data?.accessToken) {
        const decoded: DecodedToken = jwtDecode(res.data.accessToken);
        return {
          accessToken: res.data.accessToken,
          role: decoded.role,
        };
      }
      return thunkAPI.rejectWithValue(
        "Login failed: Invalid response from server."
      );
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error || "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const handleLogout = createAsyncThunk(
  "auth/handleLogout",
  async (_, thunkAPI) => {
    try {
      await logout();
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const fetchNewAccessToken = createAsyncThunk(
  "auth/getNewAccessToken",
  async (_, thunkAPI) => {
    try {
      const res = await getNewAccessToken();
      if (res?.data?.accessToken) {
        const decoded: DecodedToken = jwtDecode(res.data.accessToken);
        return {
          accessToken: res.data.accessToken,
          role: decoded.role,
        };
      }
      return thunkAPI.rejectWithValue("Failed to refresh access token.");
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "A network or server error occurred.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export interface AuthState {
  accessToken: string | null;
  role: string | null;
  isLoggedIn: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  role: null,
  isLoggedIn: false,
  status: "idle",
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutClientSide: (state) => {
      state.accessToken = null;
      state.role = null;
      state.isLoggedIn = false;
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(handleLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
      })
      // Logout Cases
      .addCase(handleLogout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.accessToken = null;
        state.role = null;
        state.isLoggedIn = false;
        state.status = "idle";
        state.error = null;
      })
      // Fetch New Access Token Cases
      .addCase(fetchNewAccessToken.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNewAccessToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
      })
      .addMatcher(
        isRejected(handleLogin, handleLogout, fetchNewAccessToken),
        (state, action) => {
          state.status = "failed";
          state.isLoggedIn = false;
          state.accessToken = null;
          state.error = action.payload as string;
        }
      );
  },
});

export const { logoutClientSide } = AuthSlice.actions;

export default AuthSlice.reducer;
