import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("rentkar_admin"))?.token || "";
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://rentkar-backend.vercel.app/api/products", { headers });
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`https://rentkar-backend.vercel.app/api/products/${id}`, { headers });
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading products...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      <Link to="/products/add" style={addBtnStyle}>Add Product</Link>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ background: "#2563eb", color: "#fff" }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>{p.category}</td>
                <td style={tdStyle}>{p.price}</td>
                <td style={tdStyle}>
                  <Link to={`/products/edit/${p._id}`} style={editBtnStyle}>Edit</Link>
                  <button onClick={() => handleDelete(p._id)} style={deleteBtnStyle}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = { padding: "10px", textAlign: "left" };
const tdStyle = { padding: "10px" };
const addBtnStyle = {
  display: "inline-block",
  marginBottom: "10px",
  padding: "8px 12px",
  background: "#2563eb",
  color: "#fff",
  borderRadius: "4px",
  textDecoration: "none",
};
const editBtnStyle = {
  padding: "5px 10px",
  marginRight: "5px",
  background: "#4ade80",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  textDecoration: "none",
};
const deleteBtnStyle = {
  padding: "5px 10px",
  background: "red",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default ProductsList;
