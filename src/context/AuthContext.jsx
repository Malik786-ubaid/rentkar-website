import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // token check on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("rentkar_admin");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (data) => {
    setUser(data);
    localStorage.setItem("rentkar_admin", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rentkar_admin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
