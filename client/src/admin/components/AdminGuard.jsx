import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../store/adminAuth";

export default function AdminGuard() {
  const { isAdmin } = useAdminAuth();
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
