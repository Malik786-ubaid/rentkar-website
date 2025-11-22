import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", price: "$100", stock: 50 },
    { id: 2, name: "Product B", price: "$150", stock: 30 },
    { id: 3, name: "Product C", price: "$200", stock: 20 },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#111827" }}>Products</h2>
        <Link to="/products/add" style={{ padding: "10px 20px", background: "#2563eb", color: "#fff", borderRadius: "6px", textDecoration: "none" }}>
          Add Product
        </Link>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <thead style={{ background: "#f3f4f6" }}>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={tdStyle}>{product.id}</td>
                <td style={tdStyle}>{product.name}</td>
                <td style={tdStyle}>{product.price}</td>
                <td style={tdStyle}>{product.stock}</td>
                <td style={tdStyle}>
                  <Link
                    to={`/products/edit/${product.id}`}
                    style={{ marginRight: "10px", padding: "5px 10px", background: "#fbbf24", color: "#fff", borderRadius: "4px", textDecoration: "none" }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{ padding: "5px 10px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: "15px", textAlign: "center", color: "#6b7280" }}>
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "600",
  color: "#374151",
};

const tdStyle = {
  padding: "12px",
  color: "#111827",
};

export default ProductsList;
