import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div style={{ width: "220px", background: "#111827", color: "#fff", minHeight: "100vh", padding: "20px" }}>
      <h2 style={{ marginBottom: "30px" }}>RentKar Admin</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={linkStyle}><Link to="/" style={linkTextStyle}>Dashboard</Link></li>
        <li style={linkStyle}><Link to="/products" style={linkTextStyle}>Products</Link></li>
        <li style={linkStyle}><Link to="/orders" style={linkTextStyle}>Orders</Link></li>

        {user.isAdmin && (
          <>
            <li style={linkStyle}><Link to="/users/edit/1" style={linkTextStyle}>Users</Link></li>
            <li style={linkStyle}><Link to="/products/add" style={linkTextStyle}>Add Product</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

const linkStyle = { marginBottom: "15px" };
const linkTextStyle = { color: "#fff", textDecoration: "none" };

export default Sidebar;
