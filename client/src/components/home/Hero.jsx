import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Loader2, X, ArrowRight, ChevronRight } from "lucide-react";
import { searchDestinations, clearSearch } from "../../store/slices/travelSlice";
import { useDebounce } from "../../hooks/useDebounce";

function SearchBar() {
  const dispatch     = useDispatch();
  const navigate     = useNavigate();
  const { searchResults, searchLoading } = useSelector((s) => s.travel);
  const [q, setQ]    = useState("");
  const [open, setOpen] = useState(false);
  const dq           = useDebounce(q, 340);
  const ref          = useRef(null);

  useEffect(() => {
    if (dq.trim().length > 1) dispatch(searchDestinations(dq));
    else dispatch(clearSearch());
  }, [dq, dispatch]);

  useEffect(() => {
    const fn = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const go = () => { if (q.trim()) { navigate(`/destinations?q=${encodeURIComponent(q)}`); setOpen(false); } };
  const showDD = open && (searchLoading || searchResults.length > 0 || q.length > 1);

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <div className={`flex items-center bg-white rounded-2xl transition-all duration-300 ${open ? "shadow-[0_0_0_3px_rgba(192,152,84,0.35),0_20px_60px_rgba(0,0,0,0.25)]" : "shadow-[0_8px_40px_rgba(0,0,0,0.22)]"}`}>
        <MapPin className="ml-5 w-5 h-5 text-[#C09854] shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && go()}
          placeholder="Where would you like to go?"
          className="flex-1 py-4 px-4 text-[#1A1208] placeholder-[#B5A898] text-base outline-none bg-transparent font-medium"
        />
        {q && (
          <button onClick={() => { setQ(""); dispatch(clearSearch()); }}
            className="p-2 text-[#B5A898] hover:text-[#3D2E18] transition-colors"
          ><X className="w-4 h-4" /></button>
        )}
        <button onClick={go}
          className="m-2 pl-5 pr-6 py-3.5 bg-[#C09854] hover:bg-[#a8803e] text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-colors shrink-0"
        >
          {searchLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      <AnimatePresence>
        {showDD && (
          <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2.5 bg-white rounded-2xl shadow-[0_16px_64px_rgba(0,0,0,0.2)] border border-[#EDE5D8] overflow-hidden z-50"
          >
            {searchLoading && (
              <div className="flex items-center gap-3 px-5 py-4 text-sm text-[#B5A898]">
                <Loader2 className="w-4 h-4 animate-spin text-[#C09854]" /> Searching…
              </div>
            )}
            {!searchLoading && searchResults.map((item) => (
              <button key={item._id}
                onClick={() => { navigate(`/package/${item._id}`); setOpen(false); setQ(""); }}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#FDFAF5] text-left border-b border-[#F4EFE6] last:border-0 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#EDE5D8] shrink-0">
                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1A1208] text-sm">{item.name}</p>
                  <p className="text-[#B5A898] text-xs mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{item.location}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#C09854] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </button>
            ))}
            {!searchLoading && !searchResults.length && q.length > 1 && (
              <div className="px-5 py-5 text-sm text-[#B5A898]">
                No results for "<span className="text-[#1A1208] font-medium">{q}</span>"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const QUICK = ["Maldives","Bali","Switzerland","Japan","Greece","Norway"];

export default function Hero() {
  const navigate = useNavigate();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <section className="relative w-full h-screen min-h-[640px] flex flex-col overflow-hidden">

      {/* BG media */}
      <div className="absolute inset-0">
        {!isMobile ? (
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="https://assets.mixkit.co/videos/5368/5368-720.mp4" type="video/mp4" />
          </video>
        ) : (
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1920&auto=format&fit=crop"
            alt="" className="absolute inset-0 w-full h-full object-cover" fetchpriority="high" />
        )}
        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1, ease:[0.16,1,0.3,1] }}
          className="text-center w-full max-w-4xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:0.3, duration:0.8 }}
            className="eyebrow text-[#D4AF7A] mb-6"
          >
            Curated International Travel
          </motion.p>

          {/* Headline */}
          <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] text-white leading-[1.05] mb-6 tracking-tight">
            Your World,<br />
            <em className="text-[#D4AF7A]">Perfectly Planned.</em>
          </h1>

          {/* Sub */}
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Bespoke journeys crafted by experts — honeymoon escapes, family adventures, luxury expeditions.
          </p>

          {/* Search */}
          <SearchBar />

          {/* Quick destinations */}
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:0.9, duration:0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            <span className="text-white/35 text-xs uppercase tracking-widest font-semibold">Popular:</span>
            {QUICK.map((d) => (
              <button key={d} onClick={() => navigate(`/destinations?q=${d}`)}
                className="text-sm text-white/55 hover:text-[#D4AF7A] transition-colors font-medium border-b border-white/15 hover:border-[#D4AF7A]/50 pb-0.5"
              >{d}</button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
        className="relative z-10 flex justify-center pb-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold">Scroll</span>
          <div className="w-px h-10 bg-white/15 relative overflow-hidden rounded-full">
            <motion.div className="absolute inset-x-0 top-0 h-5 bg-[#C09854] rounded-full"
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Trust bar */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md border-t border-white/8">
        <div className="max-w-[1320px] mx-auto px-8 lg:px-16 py-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {[
            ["2,400+", "Happy Travellers"],
            ["40+",    "Destinations"],
            ["4.9 ★",  "Average Rating"],
            ["8 Yrs",  "Of Excellence"],
          ].map(([val, lbl]) => (
            <div key={lbl} className="flex items-center gap-2.5">
              <span className="font-display text-[#D4AF7A] font-semibold text-base">{val}</span>
              <span className="text-white/40 text-xs font-medium">{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
