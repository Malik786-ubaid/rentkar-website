import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/useAuthContext";

const UsersList = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = user?.token || JSON.parse(localStorage.getItem("rentkar_admin"))?.token || "";
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user || user.role !== "admin") {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("https://rentkar-backend.vercel.app/api/users", { headers });
        setUsers(response.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user, headers]);

  const deleteUser = async (id) => {
    if (!user || user.role !== "admin") return;
    try {
      await axios.delete(`https://rentkar-backend.vercel.app/api/users/${id}`, { headers });
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  if (!user || user.role !== "admin") {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Access Denied: Admins only</p>;
  }

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading users...</p>;
  if (error) return <p style={{ textAlign: "center", marginTop: "50px" }}>{error}</p>;
  if (!users.length) return <p style={{ textAlign: "center", marginTop: "50px" }}>No users found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#1e3a8a" }}>Users List</h1>
      <ul>
        {users.map(u => (
          <li key={u._id} style={{ marginBottom: "10px" }}>
            {u.name || "No Name"} - {u.email} {" "}
            <Link to={`/users/edit/${u._id}`} style={editButtonStyle}>Edit</Link>
            <button onClick={() => deleteUser(u._id)} style={deleteButtonStyle}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const editButtonStyle = {
  padding: "3px 8px",
  marginRight: "5px",
  background: "#2563eb",
  color: "#fff",
  borderRadius: "3px",
  textDecoration: "none",
};

const deleteButtonStyle = {
  padding: "3px 8px",
  background: "#ef4444",
  color: "#fff",
  borderRadius: "3px",
  border: "none",
  cursor: "pointer",
};

export default UsersList;
