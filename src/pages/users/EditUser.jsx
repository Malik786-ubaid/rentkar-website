// src/pages/users/AddUser.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/useAuthContext";

const AddUser = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const token = user?.token || JSON.parse(localStorage.getItem("rentkar_admin"))?.token || "";
  const headers = { Authorization: `Bearer ${token}` };

  if (!user || user.role !== "admin") {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Access Denied: Admins only</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "https://rentkar-backend.vercel.app/api/users",
        { name, email, password, role },
        { headers }
      );
      alert("User added successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#1e3a8a" }}>Add New User</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
        </div>
        <div style={inputGroupStyle}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
        </div>
        <div style={inputGroupStyle}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />
        </div>
        <div style={inputGroupStyle}>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
};

const formStyle = { maxWidth: "400px", marginTop: "20px" };
const inputGroupStyle = { marginBottom: "15px", display: "flex", flexDirection: "column" };
const inputStyle = { padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" };
const buttonStyle = { padding: "10px 15px", background: "#10b981", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" };

export default AddUser;
3
