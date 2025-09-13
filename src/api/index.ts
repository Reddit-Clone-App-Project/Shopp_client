import axios from "axios";
import { store } from "../redux/store";
import {
  fetchNewAccessToken,
  logoutClientSide,
} from "../features/Auth/AuthSlice";
import history from "../history";
import { PostBuyerAddress, UpdateBuyerAddress } from "../types/BuyerAddress";

export const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Add token for every requestna
API.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken; // get token from Redux state
    console.log(
      "REQ",
      config.method?.toUpperCase(),
      config.url,
      "Auth?",
      !!token
    );
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// This interceptor ADDS the token to every request
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    const accessToken = store.getState().auth.accessToken;
    if (status === 401 && !accessToken) {
      console.log("User is not authenticated. No refresh attempt needed.");
      return Promise.reject(error);
    }

    if (status === 401 || status === 403 && !originalRequest._retry) {
      if (originalRequest.url.endsWith("/refresh")) {
        console.error("Refresh token is invalid, logging out.");
        store.dispatch(logoutClientSide());
        history.push("/login");
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const resultAction = await store.dispatch(fetchNewAccessToken());

        if (fetchNewAccessToken.fulfilled.match(resultAction)) {
          const newAccessToken = resultAction.payload.accessToken;
          // API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return API(originalRequest);
        } else {
          console.error("fetchNewAccessToken was rejected, logging out.");
          store.dispatch(logoutClientSide());
          history.push("/login");
          return Promise.reject(resultAction);
        }
      } catch (refreshError) {
        console.error(
          "A critical error occurred during token refresh, logging out."
        );
        store.dispatch(logoutClientSide());
        history.push("/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const login = (eOrP: String, password: String) =>
  API.post("/users/login", {
    eOrP,
    password,
  });

export const logout = () => API.post("/users/logout");

// Privacy information
export const getProfile = () => API.get("/users/me");
export const updateProfile = (profileData: any) =>
  API.put("/users/me", profileData);

export const changePhoneNumber = (newPhoneNumber: string) =>
  API.put("/users/me/phone", { phone: newPhoneNumber });
export const changePassword = (oldPassword: string, newPassword: string) =>
  API.put("/users/me/password", { oldPassword, newPassword });
export const changeNotificationSettings = (settings: {
  email_notification: boolean;
  order_update: boolean;
  promotion_update: boolean;
}) => API.put("/users/me/notifications", settings);

export const uploadAvatar = (avatarFile: File) => {
  const formData = new FormData();
  formData.append("avatar", avatarFile);
  return API.post("/users/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteProfile = () => API.delete("/users/me");

//! All users
export const getProductById = (productId: number) =>
  API.get(`/products/${productId}`);
export const getHot = (offset: number) =>
  API.get(`/products/hot?offset=${offset}`);
export const getStoreProducts = (
  storeId: number,
  limit: number,
  offset: number
) => API.get(`/store/${storeId}/products?limit=${limit}&offset=${offset}`);
export const getStoreHotProducts = (
  storeId: number,
  limit: number,
  offset: number
) => API.get(`/store/${storeId}/products/hot?limit=${limit}&offset=${offset}`);
export const getActiveCategories = () => API.get("/categories/active");
export const getProductsReview = (productId: number, offset: number) =>
  API.get(`/products/${productId}/reviews?limit=25&offset=${offset}`);
export const getProductsReviewByStars = (
  productId: number,
  stars: number,
  offset: number
) =>
  API.get(
    `/products/${productId}/reviews/rating/${stars}?limit=25&offset=${offset}`
  );
export const getProductsReviewByComment = (productId: number, offset: number) =>
  API.get(`/products/${productId}/reviews/comment?limit=25&offset=${offset}`);
export const getProductsReviewByImage = (productId: number, offset: number) =>
  API.get(`/products/${productId}/reviews/image?limit=25&offset=${offset}`);

export const getStore = (storeId: number) => API.get(`/store/${storeId}`);
export const getStoreReleasedRuledDiscounts = (storeId: number) =>
  API.get(`/store/${storeId}/discounts`);
export const getAllProductsByStoreId = (
  storeId: number,
  limit: number,
  offset: number
) => API.get(`/store/${storeId}/products/all`, { params: { limit, offset } });
// Search
export const searchProducts = (
  q: string,
  limit: number = 60,
  offset: number = 0,
  sortBy: string = "Relevance",
  minPrice: number | null = null,
  maxPrice: number | null = null,
  rating: number | null = null
) =>
  API.get(
    `/products/search?q=${q}&limit=${limit}&offset=${offset}&sortBy=${sortBy}${
      minPrice !== null ? `&minPrice=${minPrice}` : ""
    }${maxPrice !== null ? `&maxPrice=${maxPrice}` : ""}${
      rating !== null ? `&rating=${rating}` : ""
    }`
  );
export const searchByCategory = (
  categoryId: number,
  limit: number = 60,
  offset: number = 0,
  sortBy: string = "Most Popular",
  minPrice: number | null = null,
  maxPrice: number | null = null,
  rating: number | null = null
) =>
  API.get(
    `/categories/products/${categoryId}?limit=${limit}&offset=${offset}&sortBy=${sortBy}${
      minPrice !== null ? `&minPrice=${minPrice}` : ""
    }${maxPrice !== null ? `&maxPrice=${maxPrice}` : ""}${
      rating !== null ? `&rating=${rating}` : ""
    }`
  );

// ----------Important--------------------

export const getNewAccessToken = () => API.get("/refresh");

// ---------------------------------------

//! Buyers
export const getBuyerAddress = () => API.get("/users/me/address");
export const addANewAddress = (addressData: PostBuyerAddress) =>
  API.post("/users/me/address", addressData);
export const updateAddress = (id: number, addressData: UpdateBuyerAddress) =>
  API.put(`/users/me/address/${id}`, addressData);
export const setAddressToDefault = (id: number) =>
  API.put(`/users/me/address/default/${id}`);
export const deleteAddress = (id: number) =>
  API.delete(`/users/me/address/${id}`);
export const getBuyerCart = () => API.get("/cart");
export const addProductToCart = (
  productVariantId: number,
  quantity: number,
  priceAtPurchase: number
) =>
  API.post("/cart", {
    productVariantId,
    quantity,
    priceAtPurchase,
  });
export const removeProductFromCart = (productVariantId: number) =>
  API.delete(`/cart`, {
    data: { productVariantId },
  });
export const removeAllProductsFromCart = () => API.delete(`/cart/all`);
export const updateCartItemQuantity = (
  productVariantId: number,
  quantity: number
) =>
  API.put("/cart", {
    productVariantId,
    quantity,
  });

interface CheckoutItem {
  product_name: String;
  image_url: String;
  price_at_purchase: number;
  product_variant_id: number;
  quantity: number;
}

interface SingleCheckoutItem extends CheckoutItem {
    express_shipping: boolean;
    fast_shipping: boolean;
    economical_shipping: boolean;
    bulky_shipping: boolean;
    store_id: number;
}

interface CheckoutStore {
  store_id: number;
  items: CheckoutItem[];
  shipping_cost: number;
}

export const checkout = (
  stores: CheckoutStore[],
  total_shipping_cost: number,
  address_id: number
) =>
  API.post("/payment/create-checkout-session", {
    stores,
    total_shipping_cost,
    address_id,
  });

export const singleItemCheckout = (
  item: SingleCheckoutItem,
  address_id: number
) =>
  API.post("/payment/create-checkout-session/single-item", {
    item,
    address_id,
  });

export const getOrders = () => API.get("/orders");
export const getOrderById = (orderId: number) => API.get(`/orders/${orderId}`);
export const removeOrderById = (orderId: number) => API.delete(`/orders/${orderId}`);

// Buyer Notifications
export const getNotifications = () => API.get("/notifications");
export const markAllNotificationsAsRead = () => API.put("/notifications/mark-all-as-read");
export const markNotificationAsRead = (id: number) => API.put(`/notifications/${id}/mark-as-read`);
export const deleteNotification = (id: number) => API.delete(`/notifications/${id}`);

// Buyer Vouchers
export const getVouchersByUserId = (limit: number, offset: number) => API.get(`/discounts/me/vouchers?limit=${limit}&offset=${offset}`);

// Buyer Wishlist
export const getWishlists = () => API.get("/wishlists");
export const getWishlistDetail = (id: number) => API.get(`/wishlists/${id}`);
export const createWishlist = (name: string) => API.post("/wishlists", { name });
export const deleteWishlist = (id: number) => API.delete(`/wishlists/${id}`);
export const addProductToWishlist = (wishlistId: number, productId: number) => API.post(`/wishlists/${wishlistId}/products`, { productId });
export const removeProductFromWishlist = (wishlistId: number, productId: number) => API.delete(`/wishlists/${wishlistId}/products`, { data: { productId } });

// Chat
export const getConversations = () => API.get("/chat");
export const getConversationsForStore = (storeId: number) => API.get(`/chat/store?storeId=${storeId}`);
export const findOrCreateConversation = (buyerIdFromSeller: number | undefined, sellerId: number) => API.post('/chat/find-or-create', { buyerIdFromSeller, sellerId });

//! Seller
export const getYourStore = () => API.get("/store/your-store");