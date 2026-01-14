import React, { useContext } from "react";
import AuthContext from "../context/useAuthContext.js"; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <header style={{
      height: "60px",
      background: "#1f2937",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px"
    }}>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
};

export default Navbar;
