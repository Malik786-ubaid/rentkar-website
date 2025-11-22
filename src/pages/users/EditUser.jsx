import React, { useState } from "react";

const OrdersList = () => {
  const [orders] = useState([
    { id: 1, customer: "Ali", total: "$150", status: "Pending" },
    { id: 2, customer: "Attiq", total: "$250", status: "Completed" },
    { id: 3, customer: "Huzaifa", total: "$100", status: "Processing" },
  ]);

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#111827" }}>Orders</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <thead style={{ background: "#f3f4f6" }}>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={tdStyle}>{order.id}</td>
                <td style={tdStyle}>{order.customer}</td>
                <td style={tdStyle}>{order.total}</td>
                <td style={tdStyle}>{order.status}</td>
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
  fontWeight: "600",
  color: "#374151",
};

const tdStyle = {
  padding: "12px",
  color: "#111827",
};

export default OrdersList;
