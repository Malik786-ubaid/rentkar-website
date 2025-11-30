import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("rentkar_admin"))?.token || "";
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://rentkar-backend.vercel.app/api/stores", { headers });
        setOrders(res.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
        alert("Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (!orders.length) {
    return <p>No orders found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Orders List</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
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
              <td>{order.userName}</td>
              <td>{order.productName}</td>
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
  textAlign: "left",
};

export default OrdersList;
