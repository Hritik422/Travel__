import { motion } from "framer-motion";
import { Heart, Sparkles, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const REASONS = [
  { icon: Heart,       title: "Designed for You",       desc: "We understand romance, family dynamics, comfort preferences and the moments that matter most — every trip is deeply personal." },
  { icon: Sparkles,    title: "100% Custom",             desc: "Zero cookie-cutter packages. Every itinerary is handcrafted around your dates, style, group size and budget." },
  { icon: Users,       title: "Human Experts",           desc: "Real travel planners, not bots. From your first call to touchdown back home, a dedicated expert guides you." },
  { icon: ShieldCheck, title: "Stress-Free",             desc: "We handle flights, hotels, transfers and tours. You just show up, look out the window and enjoy." },
];

export default function WhyUs() {
  const navigate = useNavigate();
  return (
    <section className="section-padding bg-[#F4EFE6]">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
            <p className="eyebrow mb-5">Why Choose Us</p>
            <h2 className="font-display text-[clamp(2.5rem,4.5vw,3.75rem)] text-[#1A1208] leading-tight mb-6">
              Travel designed<br /><em>around you</em>
            </h2>
            <div className="gold-divider mb-7" />
            <p className="text-[#7A6A56] text-base leading-relaxed mb-10 max-w-md">
              We don't just book trips — we craft experiences that stay with you long after you're home. Every detail is personal, every moment intentional.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {[["2,400+","Happy Travellers"],["40+","Destinations"],["4.9 ★","Average Rating"],["8 Yrs","Excellence"]].map(([v,l]) => (
                <div key={l} className="border-l-2 border-[#C09854] pl-5">
                  <p className="font-display text-3xl font-semibold text-[#1A1208]">{v}</p>
                  <p className="text-[#B5A898] text-xs uppercase tracking-widest mt-1 font-semibold">{l}</p>
                </div>
              ))}
            </div>

            <button onClick={() => navigate("/contact")}
              className="btn-gold bg-[#C09854] text-white"
            >
              Start Planning <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* RIGHT — cards */}
          <div className="grid grid-cols-1 gap-4">
            {REASONS.map((r, i) => (
              <motion.div key={r.title}
                initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ duration:0.5, delay: i * 0.1 }}
                className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-[#EDE5D8] hover:border-[#C09854]/40 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F4EFE6] group-hover:bg-[#C09854]/12 flex items-center justify-center shrink-0 transition-colors">
                  <r.icon className="w-5 h-5 text-[#C09854]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1208] mb-2 text-base">{r.title}</h3>
                  <p className="text-[#7A6A56] text-sm leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
