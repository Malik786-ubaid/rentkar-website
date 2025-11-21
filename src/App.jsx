import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OrdersList from "./pages/orders/OrdersList";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductList from "./pages/products/ProductList";
import EditUser from "./pages/users/EditUser";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import { AuthContext } from "./context/AuthContext";
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" replace />;
};

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
      <Route path="/" element={<Login />} />

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
      <Route
        path="*"
        element={<h1 style={{ textAlign: "center", marginTop: 50 }}>404 - Page Not Found</h1>}
      />
    </Routes>
  );
}

export default App;
