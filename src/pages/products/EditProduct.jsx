import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: "", price: "", stock: "" });

  useEffect(() => {
    setProduct({ name: `Product ${id}`, price: `$${100 + id}`, stock: 20 + parseInt(id) });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product updated successfully!");
    navigate("/products");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: "20px", color: "#111827" }}>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Price</label>
          <input type="text" name="price" value={product.price} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Stock</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} required style={inputStyle} />
        </div>
        <button type="submit" style={buttonStyle}>Update Product</button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#fbbf24",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default EditProduct;
