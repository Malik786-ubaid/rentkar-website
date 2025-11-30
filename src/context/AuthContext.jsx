import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("rentkar_admin"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);
  const login = (userData) => {
    localStorage.setItem("rentkar_admin", JSON.stringify(userData));
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("rentkar_admin");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
