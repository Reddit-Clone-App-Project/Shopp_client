import axios from "axios";
import { store } from "../redux/store";
import { fetchNewAccessToken, handleLogout, handleLogout as logoutaction } from "../features/Auth/AuthSlice";
import history from "../history";

const API = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

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

// This interceptor ADDS the token to every request
API.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// This interceptor RESPONDS to errors
API.interceptors.response.use(
  (response) => response, // Simply return the successful response
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is because the token expired (e.g., status 401)
    // and if we haven't already tried to refresh the token for this request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark that we've tried to refresh

      try {
        // Attempt to get a new access token
        const resultAction = await store.dispatch(fetchNewAccessToken());

        // Check if the refresh was successful
        if (fetchNewAccessToken.fulfilled.match(resultAction)) {
          const newAccessToken = resultAction.payload.accessToken;
          API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          
          // Retry the original request with the new token
          return API(originalRequest);
        } else {
            // If the refresh fails, redirect to login
            await store.dispatch(handleLogout());
            history.push('/login');
            // For now, we'll just reject the promise
            return Promise.reject(resultAction);
        }

      } catch (refreshError) {
        // Handle failed refresh (e.g., logout user, redirect to login)
        await store.dispatch(handleLogout());
        history.push('/login');
        return Promise.reject(refreshError);
      }
    }

    // For any other errors, just pass them on
    return Promise.reject(error);
  }
);


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
export const searchProducts = (q: string, limit: number = 60, offset: number = 0, sortBy: string = 'Relevance', minPrice: number | null = null, maxPrice: number | null = null, rating: number | null = null) => API.get(`/products/search?q=${q}&limit=${limit}&offset=${offset}&sortBy=${sortBy}${minPrice !== null ? `&minPrice=${minPrice}` : ''}${maxPrice !== null ? `&maxPrice=${maxPrice}` : ''}${rating !== null ? `&rating=${rating}` : ''}`);
export const searchByCategory = (categoryId: number, limit: number = 60, offset: number = 0, sortBy: string = 'Most Popular', minPrice: number | null = null, maxPrice: number | null = null, rating: number | null = null) => API.get(`/categories/products/${categoryId}?limit=${limit}&offset=${offset}&sortBy=${sortBy}${minPrice !== null ? `&minPrice=${minPrice}` : ''}${maxPrice !== null ? `&maxPrice=${maxPrice}` : ''}${rating !== null ? `&rating=${rating}` : ''}`);

// ----------Important--------------------

export const getNewAccessToken = () => API.get("/refresh");

// ---------------------------------------

//! Buyers
export const getBuyerAddress = () => API.get("/users/me/address");
