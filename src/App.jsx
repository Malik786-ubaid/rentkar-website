import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import UsersList from "./pages/users/UsersList";
import EditUser from "./pages/users/EditUser";
import ProductList from "./pages/products/ProductList";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import OrdersList from "./pages/orders/OrdersList";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import { AuthContext } from "./context/AuthContext";

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="app-container" style={{ display: "flex" }}>
            {user && <Sidebar />}

            <div style={{ flex: 1 }}>
                {user && <Navbar />}

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/users"
                        element={
                            <AdminRoute>
                                <UsersList />
                            </AdminRoute>
                        }
                    />

                    <Route
                        path="/users/edit/:id"
                        element={
                            <AdminRoute>
                                <EditUser />
                            </AdminRoute>
                        }
                    />

                    <Route
                        path="/products"
                        element={
                            <PrivateRoute>
                                <ProductList />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/products/add"
                        element={
                            <AdminRoute>
                                <AddProduct />
                            </AdminRoute>
                        }
                    />

                    <Route
                        path="/products/edit/:id"
                        element={
                            <AdminRoute>
                                <EditProduct />
                            </AdminRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <PrivateRoute>
                                <OrdersList />
                            </PrivateRoute>
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
