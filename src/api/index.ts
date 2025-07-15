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

// Privacy information
export const getProfile = () => API.get("/users/me");

//! All users
export const getActiveCategories = () => API.get("/categories/active");
export const getHot = (offset:number) => API.get(`/products/hot?offset=${offset}`);
export const getStoreProducts = (storeId: number, limit: number, offset: number) => API.get(`/store/${storeId}/products?limit=${limit}&offset=${offset}`);
export const getStoreHotProducts = (storeId: number, limit: number, offset: number) => API.get(`/store/${storeId}/products/hot?limit=${limit}&offset=${offset}`);
export const getProductsReview = (productId: number, offset: number) => API.get(`/products/${productId}/reviews?limit=25&offset=${offset}`);
export const getProductsReviewByStars = (productId: number, stars: number, offset: number) => API.get(`/products/${productId}/reviews/rating/${stars}?limit=25&offset=${offset}`);
export const getProductsReviewByComment = (productId: number, offset: number) => API.get(`/products/${productId}/reviews/comment?limit=25&offset=${offset}`);
export const getProductsReviewByImage = (productId: number, offset: number) => API.get(`/products/${productId}/reviews/image?limit=25&offset=${offset}`);

export const getStore = (storeId: number) => API.get(`/store/${storeId}`);
export const getStoreReleasedRuledDiscounts = (storeId: number) => API.get(`/store/${storeId}/discounts`);

// Search
export const searchProducts = (q: string, limit: number = 60, offset: number = 0) => API.get(`/products/search?q=${q}&limit=${limit}&offset=${offset}`);
export const searchByCategory = (categoryId: number, limit: number = 20, offset: number = 0) => API.get(`/category/products/${categoryId}?limit=${limit}&offset=${offset}`);

//! Buyers
export const getBuyerAddress = () => API.get("/users/me/address");
