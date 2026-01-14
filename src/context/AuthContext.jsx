import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("rentkar_admin");
      if (storedUser) {
        setTimeout(() => setUser(JSON.parse(storedUser)), 0);
      }
      setTimeout(() => setLoading(false), 0);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://rentkar-backend.vercel.app/api/auth/login",
        { email, password }
      );
      const userData = res.data;
      setUser(userData);
      localStorage.setItem("rentkar_admin", JSON.stringify(userData));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.response?.data?.message || "Login failed" };
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://rentkar-backend.vercel.app/api/auth/signup",
        { name, email, password }
      );
      const userData = res.data;
      setUser(userData);
      localStorage.setItem("rentkar_admin", JSON.stringify(userData));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.response?.data?.message || "Signup failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rentkar_admin");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
