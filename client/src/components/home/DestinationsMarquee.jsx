import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchDestinations } from "../../store/slices/travelSlice";
import { MapPin, ArrowUpRight } from "lucide-react";

function DestCard({ dest }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/package/${dest._id}`)}
      className="group relative w-[280px] h-[400px] rounded-3xl overflow-hidden cursor-pointer shrink-0 bg-[#1A1208]"
    >
      <img src={dest.image} alt={dest.name} loading="lazy"
        className="absolute inset-0 w-full h-full object-cover img-zoom opacity-85 group-hover:opacity-100 transition-opacity duration-700"
      />
      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* category pill */}
      {dest.category && (
        <div className="absolute top-5 left-5">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C09854] text-white px-3 py-1.5 rounded-full">
            {dest.category}
          </span>
        </div>
      )}

      {/* arrow */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/0 group-hover:bg-white flex items-center justify-center transition-all duration-300">
        <ArrowUpRight className="w-4 h-4 text-transparent group-hover:text-[#1A1208] transition-colors duration-300" />
      </div>

      {/* content */}
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <div className="flex items-center gap-1.5 text-white/50 text-xs mb-2">
          <MapPin className="w-3 h-3 text-[#C09854]" />{dest.location}
        </div>
        <h3 className="font-display text-3xl text-white italic leading-tight mb-2">{dest.name}</h3>
        <div className="h-px w-6 bg-[#C09854] group-hover:w-full transition-all duration-600 mb-3" />
        <p className="text-white/50 text-xs leading-relaxed max-h-0 group-hover:max-h-12 overflow-hidden transition-all duration-500 delay-75">
          {dest.description}
        </p>
      </div>
    </div>
  );
}

export default function DestinationsMarquee() {
  const dispatch = useDispatch();
  const { destinations, destinationsLoading } = useSelector((s) => s.travel);
  useEffect(() => { if (!destinations.length) dispatch(fetchDestinations()); }, [dispatch]);

  const list = destinations.length ? destinations : [];
  if (!list.length && !destinationsLoading) return null;

  return (
    <section className="section-padding overflow-hidden" style={{ background: "linear-gradient(165deg, #FDFAF5 0%, #F4EFE6 55%, #FDFAF5 100%)" }}>
      {/* Header */}
      <div className="container-wide text-center mb-16">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
          <p className="eyebrow mb-4">The Collection</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#1A1208]">
            Curated <em>Destinations</em>
          </h2>
          <div className="gold-divider mx-auto mt-5" />
          <p className="text-[#7A6A56] mt-5 text-base max-w-md mx-auto leading-relaxed">
            Hand-selected by our travel experts. Hover to discover — click to begin.
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      {destinationsLoading ? (
        <div className="flex gap-5 px-10">
          {[1,2,3,4].map(i => <div key={i} className="w-[280px] h-[400px] rounded-3xl bg-[#EDE5D8] animate-pulse shrink-0" />)}
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-[#F4EFE6] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-[#F4EFE6] to-transparent z-10 pointer-events-none" />
          <div className="flex gap-5 px-10 w-max marquee-track">
            {[...list, ...list].map((d, i) => <DestCard key={`${d._id}-${i}`} dest={d} />)}
          </div>
        </div>
      )}
    </section>
  );
}
