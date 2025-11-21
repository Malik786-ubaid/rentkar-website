// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Orders
import OrdersList from "./pages/orders/OrdersList"; // folder 'orders', file 'OrdersList.jsx'

// Products
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductList from "./pages/products/ProductList";

// Users

import EditUser from "./pages/users/EditUser";

// Components
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";

// Context
import { AuthContext } from "./context/AuthContext";

// Private route wrapper
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" replace />;
};

// Layout component with Sidebar + Navbar
const Layout = ({ children }) => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar />
    <div style={{ flex: 1 }}>
      <Navbar />
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <Layout>
              <OrdersList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Layout>
              <ProductList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/products/add"
        element={
          <PrivateRoute>
            <Layout>
              <AddProduct />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/products/edit/:id"
        element={
          <PrivateRoute>
            <Layout>
              <EditProduct />
            </Layout>
          </PrivateRoute>
        }
      />
     
      <Route
        path="/users/edit/:id"
        element={
          <PrivateRoute>
            <Layout>
              <EditUser />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Fallback 404 */}
      <Route
        path="*"
        element={<h1 style={{ textAlign: "center", marginTop: 50 }}>404 - Page Not Found</h1>}
      />
    </Routes>
  );
}

export default App;
