import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/useAuthContext";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const token = user?.token || JSON.parse(localStorage.getItem("rentkar_admin"))?.token || "";
  const headers = { Authorization: `Bearer ${token}` };

  if (!user || user.role !== "admin") {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Access Denied: Admins only</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !price) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "https://rentkar-backend.vercel.app/api/products",
        { name, category, price },
        { headers }
      );
      alert("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#1e3a8a" }}>Add Product</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
        </div>
        <div style={inputGroupStyle}>
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} required />
        </div>
        <div style={inputGroupStyle}>
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} required />
        </div>
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

const formStyle = { maxWidth: "400px", marginTop: "20px" };
const inputGroupStyle = { marginBottom: "15px", display: "flex", flexDirection: "column" };
const inputStyle = { padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" };
const buttonStyle = { padding: "10px 15px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" };

export default AddProduct;
