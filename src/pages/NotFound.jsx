import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f3f4f6" }}>
      <h1 style={{ fontSize: "72px", marginBottom: "20px", color: "#1f2937" }}>404</h1>
      <p style={{ fontSize: "24px", marginBottom: "20px", color: "#4b5563" }}>Page Not Found</p>
      <Link to="/" style={{ textDecoration: "none", color: "#fff", background: "#1f2937", padding: "10px 20px", borderRadius: "4px" }}>Go to Dashboard</Link>
    </div>
  );
};

export default NotFound;
