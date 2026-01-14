import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/useAuthContext"; 
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [totals, setTotals] = useState({ products: 0, users: 0, orders: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTotals = async () => {
      if (!user || user.role !== "admin") return;

      setLoading(true);
      setError("");

      const token = user.token || "";
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [productsRes, usersRes, ordersRes] = await Promise.all([
          axios.get("https://rentkar-backend.vercel.app/api/products", { headers }),
          axios.get("https://rentkar-backend.vercel.app/api/users", { headers }),
          axios.get("https://rentkar-backend.vercel.app/api/stores", { headers }),
        ]);

        setTotals({
          products: productsRes.data.length || 0,
          users: usersRes.data.length || 0,
          orders: ordersRes.data.length || 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard totals:", err);
        setError(err.response?.data?.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchTotals();
  }, [user]);

  if (!user || user.role !== "admin") {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Access Denied: Admins only
      </p>
    );
  }

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading dashboard...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", marginTop: "50px", color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#1e3a8a", textAlign: "center" }}>Dashboard</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Card title="Products" count={totals.products} color="#2563eb" />
        <Card title="Users" count={totals.users} color="#10b981" />
        <Card title="Orders" count={totals.orders} color="#f59e0b" />
      </div>
    </div>
  );
};

const Card = ({ title, count, color }) => (
  <div
    style={{
      flex: 1,
      minWidth: "150px",
      padding: "20px",
      background: color,
      color: "#fff",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      transition: "transform 0.3s",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
  >
    <h2>{title}</h2>
    <p style={{ fontSize: "24px", marginTop: "10px", fontWeight: "bold" }}>
      {count}
    </p>
  </div>
);

export default Dashboard;
