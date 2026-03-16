import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../store/adminAuth";
import { Loader2, Globe, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate  = useNavigate();
  const [form, setForm]       = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [showPw, setShowPw]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) return setError("Please fill in all fields.");
    setLoading(true); setError("");
    try {
      await login(form.username, form.password);
      navigate("/admin");
    } catch (err) {
      setError(err?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0B07] flex items-center justify-center p-6"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(192,152,84,0.08)_0%,_transparent_60%)]" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[#C09854] flex items-center justify-center mx-auto mb-4">
            <Globe className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-white font-bold text-xl">One Travel Expert</h1>
          <p className="text-[#5A4E42] text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-[#16120D] border border-white/6 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-white font-semibold text-lg mb-6">Sign in to continue</h2>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#5A4E42] mb-2">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm(p => ({ ...p, username: e.target.value }))}
                placeholder="admin"
                className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-[#3D2E18] text-sm outline-none focus:border-[#C09854]/60 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#5A4E42] mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-[#3D2E18] text-sm outline-none focus:border-[#C09854]/60 transition-colors pr-11"
                />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A4E42] hover:text-white transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-[#C09854] hover:bg-[#a8803e] text-white font-bold text-sm rounded-xl transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
