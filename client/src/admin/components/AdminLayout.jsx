import { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../store/adminAuth";
import {
  LayoutDashboard, Globe, Map, Tag, Star, MessageSquare,
  Menu, X, LogOut, ChevronRight, Bell
} from "lucide-react";

const NAV = [
  { to: "/admin",              label: "Dashboard",    Icon: LayoutDashboard, end: true },
  { to: "/admin/destinations", label: "Destinations", Icon: Globe },
  { to: "/admin/itinerary",    label: "Itineraries",  Icon: Map },
  { to: "/admin/categories",   label: "Categories",   Icon: Tag },
  { to: "/admin/reviews",      label: "Reviews",      Icon: Star },
  { to: "/admin/queries",      label: "Queries",      Icon: MessageSquare },
];

function Sidebar({ collapsed, onClose }) {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  return (
    <aside className={`flex flex-col h-full bg-[#0F0D0A] transition-all duration-300 ${collapsed ? "w-0 overflow-hidden" : "w-64"}`}>
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C09854] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">OT</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">One Travel Expert</p>
            <p className="text-[#5A4E42] text-[10px]">Admin Panel</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-[#5A4E42] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {NAV.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? "bg-[#C09854]/15 text-[#C09854] border border-[#C09854]/20"
                  : "text-[#7A6A56] hover:bg-white/4 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#C09854]" : "text-[#5A4E42] group-hover:text-white"}`} />
                {label}
                {isActive && <ChevronRight className="w-3 h-3 ml-auto text-[#C09854]" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 pb-5 pt-3 border-t border-white/6 shrink-0">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C09854] to-[#8B6834] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{user || "Admin"}</p>
            <p className="text-[#5A4E42] text-[10px]">Administrator</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#7A6A56] hover:bg-red-500/10 hover:text-red-400 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FAF8F4] overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 bg-white border-b border-[#EDE5D8] px-6 h-16 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#7A6A56] hover:text-[#1A1208]">
            <Menu className="w-5 h-5" />
          </button>
          <div className="lg:hidden" />
          <div className="flex items-center gap-3 ml-auto">
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="text-xs text-[#7A6A56] hover:text-[#C09854] font-medium transition-colors"
            >
              View Site →
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
