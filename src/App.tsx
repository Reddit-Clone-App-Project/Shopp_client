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
import CreateProduct from "./pages/seller/CreateProduct.tsx";
import SellerDashboard from "./pages/seller/SellerDashboard.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ProductPage from "./pages/buyer/ProductPage.tsx";
import SearchPage from "./pages/buyer/SearchPage.tsx";
import CategoryPage from "./pages/buyer/CategoryPage.tsx";

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
        <Route
          path="dashboard"
          element={
            <PrivateRoute allowedRoles={['seller', 'admin']}>
              <SellerDashboard />
            </PrivateRoute>
          }
        />
        {/* Route /seller/create is using for testing, changes will be made later */}
        <Route path="create" element={<CreateProduct />} />
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