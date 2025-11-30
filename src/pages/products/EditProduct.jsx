import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("rentkar_admin"))?.token || "";
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchProduct = async () => {
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
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `https://rentkar-backend.vercel.app/api/products/${productId}`,
        { name, category, price },
        { headers }
      );
      setLoading(false);
      alert("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      setLoading(false);
      alert("Failed to update product.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 15px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default EditProduct;
