import axios from "axios";
import { store } from "../redux/store";
const API = axios.create({baseURL: "http://localhost:3000" });

// Add token for every request
API.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken; // get token from Redux state
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const login = (eOrP: String, password: String) => API.post('/users/login', {
    eOrP,
    password
})

export const logout = () => API.post('/users/logout');

export const getProfile = () => API.get("/users/me");