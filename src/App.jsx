import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProductManagement from "./pages/ProductManagement";
import AddProduct from "./pages/AddProduct";
import SearchProduct from "./pages/SearchProduct";
import ViewAllProducts from "./pages/viewAllProducts";
import ViewProduct from "./pages/ViewProduct";
import UpdateProduct from "./pages/UpdateProduct";
import SellMyProduct from "./pages/SellMyProduct";
import OtpVerification from "./pages/OtpVerification";
import ProductDetails from "./pages/ProductDetails";
import Payment from "./pages/Payment";

// ✅ ADD THIS IMPORT
import CartPage from "./pages/CartPage";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
  path="/payment"
  element={
    <PrivateRoute>
      <Payment />
    </PrivateRoute>
  }
/>

        <Route
          path="/products-management"
          element={
            <PrivateRoute>
              <ProductManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/products/add"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/search-product"
          element={
            <PrivateRoute>
              <SearchProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/sell-my-product"
          element={
            <PrivateRoute>
              <SellMyProduct />
            </PrivateRoute>
          }
        />
        <Route
  path="/product/:id"
  element={
   
      <ProductDetails />
   
  }
/>

        <Route
          path="/verify-otp"
          element={
            <PrivateRoute>
              <OtpVerification />
            </PrivateRoute>
          }
        />

        <Route
          path="/view-all-products"
          element={
            <PrivateRoute>
              <ViewAllProducts />
            </PrivateRoute>
          }
        />

        <Route
          path="/products/view/:id"
          element={
            <PrivateRoute>
              <ViewProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/products/update/:id"
          element={
            <PrivateRoute>
              <UpdateProduct />
            </PrivateRoute>
          }
        />

        {/* ✅ FIX: CART ROUTE ADDED */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;