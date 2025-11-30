import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [totals, setTotals] = useState({
    products: 0,
    users: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("rentkar_admin"))?.token || "";
        const headers = { Authorization: `Bearer ${token}` };
        const productsRes = await axios.get("https://rentkar-backend.vercel.app/api/products", { headers });
        const usersRes = await axios.get("https://rentkar-backend.vercel.app/api/users", { headers });
        const ordersRes = await axios.get("https://rentkar-backend.vercel.app/api/stores", { headers }); // assuming orders endpoint

        setTotals({
          products: productsRes.data.length || 0,
          users: usersRes.data.length || 0,
          orders: ordersRes.data.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchTotals();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card title="Products" count={totals.products} />
        <Card title="Users" count={totals.users} />
        <Card title="Orders" count={totals.orders} />
      </div>
    </div>
  );
};

const Card = ({ title, count }) => (
  <div style={{ flex: 1, padding: "20px", background: "#2563eb", color: "#fff", borderRadius: "8px", textAlign: "center" }}>
    <h2>{title}</h2>
    <p style={{ fontSize: "24px", marginTop: "10px" }}>{count}</p>
  </div>
);

export default Dashboard;
