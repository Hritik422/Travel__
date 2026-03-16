import { createContext, useContext, useState, useCallback } from "react";
import { adminService } from "../services/adminApi";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
  const [user, setUser]   = useState(() => localStorage.getItem("admin_user"));

  const login = useCallback(async (username, password) => {
    const res = await adminService.login({ username, password });
    localStorage.setItem("admin_token", res.token);
    localStorage.setItem("admin_user", res.username);
    setToken(res.token);
    setUser(res.username);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ token, user, login, logout, isAdmin: !!token }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
