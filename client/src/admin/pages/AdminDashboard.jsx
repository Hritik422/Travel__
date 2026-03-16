import { useEffect, useState } from "react";
import { adminService } from "../services/adminApi";
import { StatCard } from "../components/AdminUI";
import { Globe, Map, Tag, Star, MessageSquare, Clock, Mail, Phone } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getStats()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats || {};
  const queries = data?.recentQueries || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1208]">Dashboard</h1>
        <p className="text-[#7A6A56] text-sm mt-1">Welcome back — here's an overview of your data.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        <StatCard label="Destinations"  value={stats.destinations}  icon={Globe}          color="#C09854" />
        <StatCard label="Itineraries"   value={stats.itineraries}   icon={Map}            color="#6366F1" />
        <StatCard label="Categories"    value={stats.categories}    icon={Tag}            color="#10B981" />
        <StatCard label="Reviews"       value={stats.reviews}       icon={Star}           color="#F59E0B" />
        <StatCard label="Queries"       value={stats.queries}       icon={MessageSquare}  color="#EF4444" />
      </div>

      {/* Recent queries */}
      <div className="bg-white rounded-2xl border border-[#EDE5D8] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#EDE5D8] flex items-center justify-between">
          <h2 className="font-bold text-[#1A1208]">Recent Queries</h2>
          <a href="/admin/queries" className="text-xs text-[#C09854] font-semibold hover:underline">View all →</a>
        </div>
        {loading ? (
          <div className="p-8 text-center text-[#B5A898] text-sm">Loading…</div>
        ) : queries.length === 0 ? (
          <div className="p-8 text-center text-[#B5A898] text-sm">No queries yet.</div>
        ) : (
          <div className="divide-y divide-[#F4EFE6]">
            {queries.map((q) => (
              <div key={q._id} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-[#FDFAF5] transition-colors">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C09854] to-[#8B6834] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {q.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[#1A1208] truncate">{q.name}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-[#7A6A56]"><Mail className="w-3 h-3" />{q.email}</span>
                      {q.contact && <span className="flex items-center gap-1 text-xs text-[#7A6A56]"><Phone className="w-3 h-3" />{q.contact}</span>}
                    </div>
                    {q.location && <p className="text-xs text-[#B5A898] mt-1">📍 {q.location}</p>}
                    {q.message && <p className="text-xs text-[#7A6A56] mt-1 truncate max-w-sm">{q.message}</p>}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-1 text-[#B5A898] text-xs">
                    <Clock className="w-3 h-3" />
                    {q.createdAt ? new Date(q.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short" }) : "—"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
