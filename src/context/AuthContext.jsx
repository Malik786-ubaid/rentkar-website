import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("rentkar_admin");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (!localStorage.getItem("rentkar_users")) {
      localStorage.setItem("rentkar_users", JSON.stringify([]));
    }
  }, []);

  const hardcodedUsers = [
    { name: "Admin", email: "admin@rentkar.com", password: "123456", isAdmin: true },
  ];

  const login = (data) => {
    setUser(data);
    localStorage.setItem("rentkar_admin", JSON.stringify(data));
  };

  const signup = (data) => {
    let users = JSON.parse(localStorage.getItem("rentkar_users")) || [];
    if (users.find((u) => u.email === data.email)) {
      alert("Email already exists!");
      return false;
    }
    users.push(data);
    localStorage.setItem("rentkar_users", JSON.stringify(users));
    login(data);
    return true;
  };

  const validateUser = (email, password) => {
    let foundUser = hardcodedUsers.find(u => u.email === email && u.password === password);
    if (foundUser) return foundUser;

    let users = JSON.parse(localStorage.getItem("rentkar_users")) || [];
    foundUser = users.find(u => u.email === email && u.password === password);
    return foundUser || null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rentkar_admin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, validateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
