import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/useAuthContext";

const ProductsList = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const token = user?.token || JSON.parse(localStorage.getItem("rentkar_admin"))?.token || "";
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user || user.role !== "admin") {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("https://rentkar-backend.vercel.app/api/products", { headers });
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, headers]);

  if (!user || user.role !== "admin") {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Access Denied: Admins only</p>;
  }

  if (loading) return <p style={{ textAlign: "center" }}>Loading products...</p>;
  if (error) return <p style={{ textAlign: "center" }}>{error}</p>;
  if (!products.length) return <p style={{ textAlign: "center" }}>No products found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#1e3a8a" }}>Products List</h1>
      <Link to="/products/add" style={addButtonStyle}>Add New Product</Link>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>{prod.category}</td>
              <td>${prod.price}</td>
              <td>
                <Link to={`/products/edit/${prod._id}`} style={editButtonStyle}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const addButtonStyle = {
  display: "inline-block",
  marginBottom: "15px",
  padding: "8px 15px",
  background: "#10b981",
  color: "#fff",
  borderRadius: "5px",
  textDecoration: "none",
};

const editButtonStyle = {
  padding: "5px 10px",
  background: "#2563eb",
  color: "#fff",
  borderRadius: "5px",
  textDecoration: "none",
};

export default ProductsList;
