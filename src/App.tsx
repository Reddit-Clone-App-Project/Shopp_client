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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/seller" element={<SellerLandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route
        path="/new-store"
        element={<PrivateRoute component={CreateStorePage} />}
      />
      <Route
        path="/seller/dashboard"
        element={
          <PrivateRoute
            allowedRoles={["seller", "admin"]}
            component={SellerDashboard}
          />
        }
      />
      {/* Route /seller/create is using for testing, changes will be made later */}
      <Route path="/seller/create" element={<CreateProduct />} />
      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
