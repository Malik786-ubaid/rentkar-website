import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/useAuthContext";

const EditUser = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const token = user?.token || JSON.parse(localStorage.getItem("rentkar_admin"))?.token || "";
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchUser = async () => {
      if (!user || user.role !== "admin") {
        setFetching(false);
        return;
      }
      try {
        const res = await axios.get(`https://rentkar-backend.vercel.app/api/users/${userId}`, { headers });
        setEmail(res.data.email || "");
        setRole(res.data.role || "");
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Failed to fetch user details.");
      } finally {
        setFetching(false);
      }
    };
    fetchUser();
  }, [userId, user, headers]);

  if (!user || user.role !== "admin") {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Access Denied: Admins only</p>;
  }

  if (fetching) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading user details...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      alert("Role cannot be empty!");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `https://rentkar-backend.vercel.app/api/users/${userId}`,
        { role },
        { headers }
      );
      alert("User updated successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#1e3a8a" }}>Edit User</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label>Email</label>
          <input type="email" value={email} disabled style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle} required>
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
};

const formStyle = { maxWidth: "400px", marginTop: "20px" };
const inputGroupStyle = { marginBottom: "15px", display: "flex", flexDirection: "column" };
const inputStyle = { padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" };
const buttonStyle = { padding: "10px 15px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" };

export default EditUser;
