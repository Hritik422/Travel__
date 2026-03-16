import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Globe, Users, ShieldCheck, Award, ArrowRight, Phone } from "lucide-react";

const VALUES = [
  { icon: Globe,       title: "Global Expertise",        desc: "Deep destination knowledge across 40+ countries, curated through years of on-ground experience and personal travel." },
  { icon: Users,       title: "Personal Touch",           desc: "Every traveller is unique. We listen deeply and build journeys that reflect your personal story and style." },
  { icon: ShieldCheck, title: "Trusted & Transparent",   desc: "No hidden charges, no surprises — clear, honest pricing and reliable service at every single step." },
  { icon: Award,       title: "Award-Winning Service",   desc: "4.9/5 from 2,400+ happy travellers. We're proud of the trust people place in us with their most precious time." },
];

const TEAM = [
  { name: "Hritik Gupta",  role: "Founder & Lead Expert",      bio: "8+ years curating luxury journeys across 40+ countries.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop&crop=face" },
  { name: "Priya Anand",   role: "Honeymoon Specialist",        bio: "Crafts intimate, unforgettable romantic experiences for couples worldwide.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop&crop=face" },
  { name: "Aryan Mehta",   role: "Family Travel Consultant",    bio: "Designs seamless family itineraries that delight every generation.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&crop=face" },
];

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-20 h-[60vh] min-h-[460px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
          alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1320px] mx-auto px-8 lg:px-16 pb-16 w-full">
            <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9 }}>
              <p className="eyebrow text-[#D4AF7A] mb-4">Our Story</p>
              <h1 className="font-display text-[clamp(3.5rem,7vw,6rem)] text-white leading-tight">
                Travel,<br /><em className="text-[#D4AF7A]">Redefined.</em>
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="section-padding">
        <div className="container-normal text-center">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <p className="font-display text-[clamp(1.4rem,2.5vw,2rem)] text-[#1A1208] leading-relaxed font-light italic max-w-3xl mx-auto">
              "We don't just book trips — we craft experiences that stay with you long after you've come home."
            </p>
            <div className="gold-divider mx-auto my-8" />
            <p className="text-[#7A6A56] leading-relaxed text-base max-w-2xl mx-auto">
              One Travel Expert was founded on a single belief: that travel should feel effortless, personal, and extraordinary. Starting from a small desk in Mumbai, we've grown into a trusted name for hundreds of families, couples, and adventurers who trust us with their most precious time — their holidays.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding-sm bg-[#F4EFE6]">
        <div className="container-normal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[["2,400+","Happy Travellers"],["40+","Destinations"],["4.9 ★","Average Rating"],["8 Yrs","Experience"]].map(([v,l],i)=>(
              <motion.div key={l} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }}
                className="text-center py-8"
              >
                <p className="font-display text-4xl md:text-5xl font-semibold text-[#1A1208]">{v}</p>
                <p className="text-[#B5A898] text-xs uppercase tracking-[0.2em] font-bold mt-3">{l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#0D0B07]">
        <div className="container-wide">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <p className="eyebrow mb-4">What Drives Us</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white">Our Core Values</h2>
            <div className="gold-divider mx-auto mt-5" />
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }}
                className="flex gap-5 p-7 border border-white/5 rounded-2xl hover:border-[#C09854]/25 hover:bg-white/2 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl border border-white/8 flex items-center justify-center shrink-0 group-hover:border-[#C09854]/35 transition-colors">
                  <v.icon className="w-5 h-5 text-[#C09854]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                  <p className="text-[#5A4E42] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[#FDFAF5]">
        <div className="container-wide">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <p className="eyebrow mb-4">The People</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#1A1208]">
              Meet Your <em>Travel Team</em>
            </h2>
            <div className="gold-divider mx-auto mt-5" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-10">
            {TEAM.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.12 }}
                className="text-center group"
              >
                <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-6 border-2 border-[#EDE5D8] group-hover:border-[#C09854] transition-colors duration-300 shadow-lg">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="font-semibold text-[#1A1208] text-lg">{m.name}</h3>
                <p className="eyebrow text-[#C09854] mt-1.5 mb-3">{m.role}</p>
                <p className="text-[#7A6A56] text-sm leading-relaxed">{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#1A1208] text-center">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="max-w-2xl mx-auto px-6"
        >
          <p className="eyebrow mb-4">Ready?</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white mb-5">
            Start Your <em className="text-[#D4AF7A]">Journey Today</em>
          </h2>
          <div className="gold-divider mx-auto mb-7" />
          <p className="text-[#5A4E42] text-base leading-relaxed mb-12">
            Let's plan your perfect trip together. Talk to one of our travel experts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/contact")} className="btn-gold">
              Plan My Trip <ArrowRight className="w-4 h-4" />
            </button>
            <a href="tel:+918090988780" className="btn-outline border-white/20">
              <Phone className="w-4 h-4" /> Call Us Now
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
