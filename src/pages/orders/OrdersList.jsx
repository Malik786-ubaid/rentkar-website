import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/useAuthContext";

const OrdersList = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || user.role !== "admin") {
        setLoading(false);
        return;
      }

      const headers = { Authorization: `Bearer ${user.token}` };
      try {
        const res = await axios.get("https://rentkar-backend.vercel.app/api/stores", { headers });
        setOrders(res.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user || user.role !== "admin") {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Access Denied: Admins only</p>;
  }

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading orders...</p>;
  if (error) return <p style={{ textAlign: "center", marginTop: "50px" }}>{error}</p>;
  if (!orders.length) return <p style={{ textAlign: "center", marginTop: "50px" }}>No orders found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#1e3a8a" }}>Orders List</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userName || order.user?.email}</td>
              <td>{order.productName || order.product?.name}</td>
              <td>{order.quantity}</td>
              <td>${order.totalPrice}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  textAlign: "left",
};

export default OrdersList;
