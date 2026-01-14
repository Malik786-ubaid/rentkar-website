import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/useAuthContext";

const EditProduct = () => {
  const { productId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const token = user?.token || JSON.parse(localStorage.getItem("rentkar_admin"))?.token || "";
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!user || user.role !== "admin") {
        setFetching(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://rentkar-backend.vercel.app/api/products/${productId}`,
          { headers }
        );
        setName(res.data.name || "");
        setCategory(res.data.category || "");
        setPrice(res.data.price || "");
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to fetch product details.");
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [productId, user, headers]);

  if (!user || user.role !== "admin") {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Access Denied: Admins only</p>;
  }

  if (fetching) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading product...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.put(
        `https://rentkar-backend.vercel.app/api/products/${productId}`,
        { name, category, price },
        { headers }
      );
      alert("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#1e3a8a" }}>Edit Product</h1>
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
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

const formStyle = { maxWidth: "400px", marginTop: "20px" };
const inputGroupStyle = { marginBottom: "15px", display: "flex", flexDirection: "column" };
const inputStyle = { padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" };
const buttonStyle = { padding: "10px 15px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" };

export default EditProduct;
