import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, ArrowRight, Flame, TrendingUp, Percent, MapPin } from "lucide-react";

const DATA = {
  Trending: [
    { country:"Maldives",    price:"₹1,20,000", original:"₹1,45,000", off:17, days:"5D/4N", theme:"Luxury",   line:"Overwater villas & private beach dinners",          tag:"Honeymoon Pick", rating:4.9, img:"https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=700&auto=format&fit=crop" },
    { country:"Japan",       price:"₹85,000",   original:"₹1,00,000", off:15, days:"8D/7N", theme:"Cultural", line:"Cherry blossoms, temples & bullet trains",           tag:"Best Seller",    rating:4.8, img:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&auto=format&fit=crop" },
    { country:"Norway",      price:"₹1,73,000", original:"₹2,05,000", off:16, days:"7D/6N", theme:"Nature",   line:"Fjords, Northern Lights & scenic cruises",           tag:"Limited Time",   rating:4.7, img:"https://images.unsplash.com/photo-1501786223405-6d024d7e3da4?w=700&auto=format&fit=crop" },
    { country:"Vietnam",     price:"₹38,000",   original:"₹46,000",   off:17, days:"6D/5N", theme:"Budget",   line:"Ha Long Bay, Hoi An & street food culture",          tag:"Great Value",    rating:4.6, img:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&auto=format&fit=crop" },
  ],
  "Best Deals": [
    { country:"Thailand",    price:"₹42,000",   original:"₹52,000",   off:19, days:"7D/6N", theme:"Beach",    line:"Temples, islands & night markets",                   tag:"19% OFF",        rating:4.5, img:"https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=700&auto=format&fit=crop" },
    { country:"Bali",        price:"₹65,000",   original:"₹78,000",   off:17, days:"6D/5N", theme:"Culture",  line:"Rice terraces, temples & beach clubs",               tag:"17% OFF",        rating:4.7, img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&auto=format&fit=crop" },
    { country:"Singapore",   price:"₹58,000",   original:"₹70,000",   off:17, days:"5D/4N", theme:"Family",   line:"Gardens, Sentosa & city culture",                    tag:"Family Deal",    rating:4.6, img:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=700&auto=format&fit=crop" },
    { country:"Dubai",       price:"₹75,000",   original:"₹90,000",   off:17, days:"5D/4N", theme:"City",     line:"Burj Khalifa, desert safari & gold souk",            tag:"Popular",        rating:4.6, img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&auto=format&fit=crop" },
  ],
  "Most Viewed": [
    { country:"Switzerland", price:"₹1,85,000", original:"₹2,20,000", off:16, days:"8D/7N", theme:"Scenic",   line:"Alps, Jungfraujoch & glacier express train",         tag:"Premium",        rating:4.9, img:"https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=700&auto=format&fit=crop" },
    { country:"Greece",      price:"₹1,40,000", original:"₹1,65,000", off:15, days:"8D/7N", theme:"Romance",  line:"Santorini, Mykonos & Aegean sailing",                tag:"Honeymoon",      rating:4.8, img:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=700&auto=format&fit=crop" },
    { country:"Australia",   price:"₹2,10,000", original:"₹2,50,000", off:16, days:"10D/9N",theme:"Explorer", line:"Great Barrier Reef, Sydney & coastal drives",        tag:"Long Stay",      rating:4.8, img:"https://images.unsplash.com/photo-1526958977630-bc61b30a2009?w=700&auto=format&fit=crop" },
    { country:"Japan",       price:"₹90,000",   original:"₹1,05,000", off:14, days:"9D/8N", theme:"Cultural", line:"Kyoto temples, Tokyo neon & Mt Fuji views",          tag:"Best Seller",    rating:4.9, img:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=700&auto=format&fit=crop" },
  ],
};

const TABS = [
  { key: "Trending",     Icon: Flame },
  { key: "Best Deals",   Icon: Percent },
  { key: "Most Viewed",  Icon: TrendingUp },
];

function PackageCard({ pkg, i }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay: i * 0.06 }}
      onClick={() => navigate("/destinations")}
      className="card cursor-pointer group"
    >
      <div className="relative h-52 overflow-hidden rounded-t-[1.25rem]">
        <img src={pkg.img} alt={pkg.country} loading="lazy"
          className="w-full h-full object-cover img-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-3.5 left-3.5 text-[10px] font-bold bg-[#C09854] text-white px-3 py-1.5 rounded-full uppercase tracking-wider">
          {pkg.tag}
        </span>
        <span className="absolute top-3.5 right-3.5 text-[10px] font-bold bg-black/70 text-white px-2.5 py-1.5 rounded-full backdrop-blur-sm">
          {pkg.off}% OFF
        </span>
        <div className="absolute bottom-3 left-4 flex items-center gap-1 text-white/70 text-xs">
          <MapPin className="w-3 h-3 text-[#D4AF7A]" />{pkg.country}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-xl text-[#1A1208]">{pkg.country}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-[#1A1208]">{pkg.rating}</span>
          </div>
        </div>
        <p className="text-[#7A6A56] text-sm mb-4 clamp-2 leading-relaxed">{pkg.line}</p>
        <div className="flex items-center gap-4 text-xs text-[#B5A898] mb-5">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{pkg.days}</span>
          <span className="px-2.5 py-1 bg-[#F4EFE6] text-[#7A6A56] rounded-full font-medium">{pkg.theme}</span>
        </div>
        <div className="flex items-end justify-between pt-4 border-t border-[#EDE5D8]">
          <div>
            <p className="font-display text-2xl font-semibold text-[#1A1208]">{pkg.price}</p>
            <p className="text-xs text-[#B5A898] line-through mt-0.5">{pkg.original}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] group-hover:bg-[#C09854] flex items-center justify-center transition-colors duration-300">
            <ArrowRight className="w-4 h-4 text-[#C09854] group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedPackages() {
  const [active, setActive] = useState("Trending");
  return (
    <section className="section-padding bg-[#FDFAF5]">
      <div className="container-wide">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          className="text-center mb-14"
        >
          <p className="eyebrow mb-4">Holiday Packages</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#1A1208]">
            Handpicked for <em>You</em>
          </h2>
          <div className="gold-divider mx-auto mt-5" />
        </motion.div>

        {/* Tab switcher — centred */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-1 bg-white border border-[#EDE5D8] rounded-2xl p-1.5 shadow-sm">
            {TABS.map(({ key, Icon }) => (
              <button key={key} onClick={() => setActive(key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${active === key ? "bg-[#1A1208] text-white shadow-md" : "text-[#7A6A56] hover:text-[#1A1208] hover:bg-[#FDFAF5]"}`}
              >
                <Icon className="w-3.5 h-3.5" />{key}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {DATA[active].map((pkg, i) => <PackageCard key={`${pkg.country}-${i}`} pkg={pkg} i={i} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
