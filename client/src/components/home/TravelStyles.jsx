import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchCategories } from "../../store/slices/travelSlice";
import { ArrowUpRight } from "lucide-react";

const FALLBACK = [
  { category:"honeymoon", title:"Honeymoon",   subtitle:"Romantic escapes for two",          image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop" },
  { category:"family",    title:"Family",       subtitle:"Memories for all ages",              image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&auto=format&fit=crop" },
  { category:"adventure", title:"Adventure",    subtitle:"Thrills & bold journeys",            image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop" },
  { category:"luxury",    title:"Luxury",       subtitle:"Indulgent stays & experiences",      image:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop" },
  { category:"budget",    title:"Budget",       subtitle:"Best value, best time",              image:"https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=800&auto=format&fit=crop" },
  { category:"cultural",  title:"Cultural",     subtitle:"Heritage, art & history",            image:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop" },
];

export default function TravelStyles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((s) => s.travel);
  useEffect(() => { if (!categories.length) dispatch(fetchCategories()); }, [dispatch]);

  const items = categories.length ? categories : FALLBACK;

  return (
    <section className="section-padding bg-[#0D0B07]">
      <div className="container-wide">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Travel By Style</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white">
            How do you <em>love to travel?</em>
          </h2>
          <div className="gold-divider mx-auto mt-5" />
          <p className="text-[#7A6A56] mt-5 text-base max-w-md mx-auto">
            Pick your style — we'll build the perfect journey around it.
          </p>
        </motion.div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {items.map((cat, i) => {
            const big = i === 0;
            return (
              <motion.div key={cat.category || i}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:"-50px" }}
                transition={{ duration:0.5, delay: i * 0.06 }}
                onClick={() => navigate(`/destinations?q=${encodeURIComponent(cat.title)}`)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${big ? "md:row-span-2" : ""}`}
                style={{ height: big ? undefined : "210px", minHeight: big ? "448px" : undefined }}
              >
                <img src={cat.image} alt={cat.title} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-[#C09854]/0 group-hover:bg-[#C09854]/12 transition-colors duration-400" />

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="font-display text-white text-xl md:text-2xl">{cat.title}</h3>
                  <p className="text-white/45 text-xs mt-1 leading-relaxed max-h-0 group-hover:max-h-8 overflow-hidden transition-all duration-300">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 group-hover:bg-[#C09854] flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
