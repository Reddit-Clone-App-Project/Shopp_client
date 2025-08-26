import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import Root from "./components/Root.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import SellerLandingPage from "./pages/seller/SellerLandingPage.tsx";
import HomePage from "./pages/buyer/HomePage.tsx";

import PrivateRoute from "./components/PrivateRoutes.tsx";
import CreateStorePage from "./pages/seller/CreateStorePage.tsx";
import CreateProduct from "./pages/seller/ProductManagement/CreateProduct.tsx";
import SellerDashboard from "./pages/seller/SellerDashboard.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ProductPage from "./pages/buyer/ProductPage.tsx";
import SearchPage from "./pages/buyer/SearchPage.tsx";
import CategoryPage from "./pages/buyer/CategoryPage.tsx";
import CartPage from "./pages/buyer/CartPage.tsx";
import AccessGuard from "./components/AccesGuard.tsx";
import PaymentSuccess from "./pages/buyer/PaymentSuccess.tsx";
import PaymentFail from "./pages/buyer/PaymentFail.tsx";
import AllProduct from "./pages/seller/ProductManagement/AllProduct.tsx";

import BuyerPage from "./pages/buyer/BuyerPage.tsx";
import BuyerProfile from "./components/BuyerProfile.tsx";
import BuyerAddress from "./features/BuyerAddress/BuyerAddress.tsx";
import BuyerChangePassword from "./components/BuyerChangePassword.tsx";
import BuyerNotificationSettings from "./components/BuyerNotificationSettings.tsx";
import BuyerPrivacySettings from "./components/BuyerPrivacySettings.tsx";
import NotificationOrders from "./components/NotificationOrders.tsx";
import NotificationPromotions from "./components/NotificationPromotions.tsx";
import Orders from "./components/Orders.tsx";
import Vouchers from "./components/Vouchers.tsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/category">
        <Route path=":slug" element={<CategoryPage />} />
      </Route>
      <Route path="/cart" element={
        <AccessGuard>
          <CartPage />
        </AccessGuard>
        } 
      />

      <Route path="/me" element={<PrivateRoute><BuyerPage /></PrivateRoute>}>
        <Route index element={<Navigate to="/me/my-account/profile" replace />} />
        
        <Route path="notification">
          <Route path="n-orders" element={<NotificationOrders />} />
          <Route path="promotions" element={<NotificationPromotions />} />
        </Route>
        
        <Route path="my-account">
          <Route path="profile" element={<BuyerProfile />} />
          <Route path="address" element={<BuyerAddress />} />
          <Route path="change-password" element={<BuyerChangePassword />} />
          <Route path="notification-settings" element={<BuyerNotificationSettings />} />
          <Route path="privacy-settings" element={<BuyerPrivacySettings />} />
        </Route>

        <Route path="orders" element={<Orders />} />
        <Route path="vouchers" element={<Vouchers />} />

      </Route>

      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="/fail" element={<PaymentFail />} />

      <Route
        path="/new-store"
        element={
          <PrivateRoute>
            <CreateStorePage />
          </PrivateRoute>
        }
      />

      <Route path="/seller">
        <Route index element={<SellerLandingPage />} />
        <Route path="dashboard" element={<SellerDashboard />} />
        {/*<Route
          path="dashboard"
          element={
            <PrivateRoute allowedRoles={['seller', 'admin']}>
              <SellerDashboard />
            </PrivateRoute>
          }
        />*/}
        {/* Route /seller/create is using for testing, changes will be made later */}
        <Route path="product/create" element={<CreateProduct />} />
        <Route path="product/all" element={<AllProduct />} />
      </Route>

      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;