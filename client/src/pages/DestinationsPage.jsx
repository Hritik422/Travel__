import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDestinations } from "../store/slices/travelSlice";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Search, SlidersHorizontal, X, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";

const LOCATIONS  = ["All","Bali","Maldives","Switzerland","Japan","Thailand","Dubai","Vietnam","Greece","Singapore","Norway"];
const CATEGORIES = ["All","Honeymoon","Family","Adventure","Luxury","Budget","Cultural"];
const PER_PAGE   = 9;

function Skeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#EDE5D8] animate-pulse">
      <div className="h-56 bg-[#EDE5D8]" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-[#EDE5D8] rounded-lg w-3/4" />
        <div className="h-4 bg-[#EDE5D8] rounded-lg w-full" />
        <div className="h-4 bg-[#EDE5D8] rounded-lg w-2/3" />
      </div>
    </div>
  );
}

function DestCard({ dest, i }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.4, delay: i * 0.04 }}
      onClick={() => navigate(`/package/${dest._id}`)}
      className="card cursor-pointer group"
    >
      <div className="relative h-56 overflow-hidden rounded-t-[1.25rem]">
        <img src={dest.image} alt={dest.name} loading="lazy"
          className="w-full h-full object-cover img-zoom" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {dest.category && (
          <span className="absolute top-4 left-4 text-[10px] font-bold bg-[#C09854] text-white px-3 py-1.5 rounded-full uppercase tracking-wider">
            {dest.category}
          </span>
        )}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/75 text-xs font-medium">
          <MapPin className="w-3 h-3 text-[#D4AF7A]" />{dest.location}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-[#1A1208] mb-2">{dest.name}</h3>
        <p className="text-[#7A6A56] text-sm leading-relaxed clamp-2 mb-5">{dest.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-[#EDE5D8]">
          <span className="text-xs font-bold text-[#C09854] uppercase tracking-wider">View Package</span>
          <div className="w-9 h-9 rounded-full bg-[#F4EFE6] group-hover:bg-[#C09854] flex items-center justify-center transition-colors duration-300">
            <ArrowRight className="w-4 h-4 text-[#C09854] group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DestinationsPage() {
  const dispatch = useDispatch();
  const { destinations, destinationsLoading } = useSelector((s) => s.travel);
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get("q") || "";

  const [search, setSearch]     = useState(qParam);
  const [location, setLocation] = useState("All");
  const [category, setCategory] = useState("All");
  const [page, setPage]         = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const dq = useDebounce(search, 300);

  useEffect(() => { if (!destinations.length) dispatch(fetchDestinations()); }, [dispatch]);
  useEffect(() => { setSearch(qParam); }, [qParam]);
  useEffect(() => { setPage(1); }, [dq, location, category]);

  const filtered = destinations.filter(d => {
    const s = dq.toLowerCase();
    return (
      (!s || d.name?.toLowerCase().includes(s) || d.location?.toLowerCase().includes(s) || d.description?.toLowerCase().includes(s)) &&
      (location === "All" || d.location?.toLowerCase().includes(location.toLowerCase()) || d.name?.toLowerCase().includes(location.toLowerCase())) &&
      (category === "All" || d.category?.toLowerCase() === category.toLowerCase())
    );
  });

  const paginated  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const hasFilters = location !== "All" || category !== "All" || search;
  const clearAll   = () => { setSearch(""); setLocation("All"); setCategory("All"); setPage(1); setSearchParams({}); };

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      <Navbar />

      {/* Dark page hero */}
      <div className="bg-[#0D0B07] pt-20">
        <div className="max-w-[1320px] mx-auto px-8 lg:px-16 py-20">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
            <p className="eyebrow mb-4">Explore</p>
            <h1 className="font-display text-[clamp(3rem,6vw,5rem)] text-white leading-tight mb-3">
              {qParam ? <>Results for <em>"{qParam}"</em></> : <><em>All</em> Destinations</>}
            </h1>
            <p className="text-[#5A4E42] text-sm mb-10">
              {destinationsLoading ? "Loading…" : `${filtered.length} curated destination${filtered.length !== 1 ? "s" : ""} found`}
            </p>
          </motion.div>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A4E42] pointer-events-none" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by destination or country…"
              className="w-full pl-12 pr-10 py-4 bg-white/6 border border-white/8 rounded-2xl text-white placeholder-[#5A4E42] text-sm outline-none focus:border-[#C09854]/50 focus:bg-white/10 transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5A4E42] hover:text-white/70">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1320px] mx-auto px-8 lg:px-16 py-16">

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#EDE5D8] rounded-xl text-sm font-semibold text-[#3D2E18] hover:border-[#C09854] transition-colors shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
            {hasFilters && <span className="w-2 h-2 bg-[#C09854] rounded-full" />}
            <ChevronDown className={`w-3.5 h-3.5 text-[#B5A898] transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Quick category pills */}
          {CATEGORIES.slice(1).map(c => (
            <button key={c} onClick={() => setCategory(category === c ? "All" : c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${category === c ? "bg-[#1A1208] text-white border-[#1A1208] shadow-md" : "bg-white text-[#3D2E18] border-[#EDE5D8] hover:border-[#C09854] hover:text-[#C09854]"}`}
            >{c}</button>
          ))}

          {hasFilters && (
            <button onClick={clearAll} className="flex items-center gap-1.5 text-xs text-[#B5A898] hover:text-[#C09854] transition-colors font-semibold ml-1">
              <X className="w-3 h-3" /> Clear all
            </button>
          )}
        </div>

        {/* Expanded filters */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
              className="overflow-hidden mb-8"
            >
              <div className="grid sm:grid-cols-2 gap-5 p-7 bg-white rounded-2xl border border-[#EDE5D8] shadow-sm">
                {[["Location", LOCATIONS, location, setLocation], ["Category", CATEGORIES, category, setCategory]].map(([label, opts, val, set]) => (
                  <div key={label}>
                    <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B5A898] block mb-3">{label}</label>
                    <select value={val} onChange={e => { set(e.target.value); setPage(1); }}
                      className="w-full px-4 py-3 bg-[#FDFAF5] border border-[#EDE5D8] rounded-xl text-sm text-[#1A1208] outline-none focus:border-[#C09854] transition-colors"
                    >
                      {opts.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {destinationsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <Skeleton key={i} />)}
          </div>
        ) : paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((d, i) => <DestCard key={d._id} dest={d} i={i} />)}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-6xl mb-6">🌍</p>
            <h3 className="font-display text-3xl text-[#1A1208] mb-3">No destinations found</h3>
            <p className="text-[#B5A898] text-base mb-8">Try a different search or clear your filters.</p>
            <button onClick={clearAll} className="btn-gold bg-[#C09854]">Clear Filters</button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <button disabled={page===1} onClick={() => { setPage(p=>p-1); window.scrollTo({top:0,behavior:"smooth"}); }}
              className="px-6 py-3 text-sm font-semibold rounded-xl border border-[#EDE5D8] bg-white disabled:opacity-40 hover:border-[#C09854] hover:text-[#C09854] transition-colors"
            >← Prev</button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(p => (
              <button key={p} onClick={() => { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); }}
                className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${p===page?"bg-[#1A1208] text-white shadow-lg":"bg-white border border-[#EDE5D8] hover:border-[#C09854] text-[#3D2E18]"}`}
              >{p}</button>
            ))}
            <button disabled={page===totalPages} onClick={() => { setPage(p=>p+1); window.scrollTo({top:0,behavior:"smooth"}); }}
              className="px-6 py-3 text-sm font-semibold rounded-xl border border-[#EDE5D8] bg-white disabled:opacity-40 hover:border-[#C09854] hover:text-[#C09854] transition-colors"
            >Next →</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
