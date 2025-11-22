import React, { useState, useEffect } from "react";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const sampleOrders = [
      { id: 1, customer: "Ali", product: "Honda Civic", quantity: 1, total: 5000, status: "Completed" },
      { id: 2, customer: "Sara", product: "Toyota Corolla", quantity: 2, total: 8000, status: "Pending" },
      { id: 3, customer: "Usman", product: "Suzuki Swift", quantity: 1, total: 3000, status: "Cancelled" },
    ];
    setOrders(sampleOrders);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Orders List</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1f2937", color: "#fff" }}>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Total ($)</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>{order.id}</td>
                <td style={tdStyle}>{order.customer}</td>
                <td style={tdStyle}>{order.product}</td>
                <td style={tdStyle}>{order.quantity}</td>
                <td style={tdStyle}>{order.total}</td>
                <td style={{ ...tdStyle, color: order.status === "Completed" ? "green" : order.status === "Pending" ? "orange" : "red" }}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
};

export default OrdersList;
