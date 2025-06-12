import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    accessToken: string | null;
    isLoggedIn: boolean;
    user: any | null;
};

const initialState: AuthState = {
    accessToken: null,
    isLoggedIn: false,
    user: null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ accessToken: string; user?: any}>) {
            state.accessToken = action.payload.accessToken;
            state.isLoggedIn = true;
            if(action.payload.user) state.user = action.payload.user;
        },
        logout(state) {
            state.accessToken = null;
            state.isLoggedIn = false;
            state.user = null;
        },
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            state.isLoggedIn = true;
        }
    },
});

export const { loginSuccess, logout, setAccessToken } = AuthSlice.actions;
export default AuthSlice.reducer;