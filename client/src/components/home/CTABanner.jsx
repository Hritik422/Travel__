import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function CTABanner() {
  const navigate = useNavigate();
  return (
    <section className="section-padding-sm bg-[#F4EFE6]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.8 }}
          className="relative rounded-[2rem] overflow-hidden min-h-[360px] flex items-center"
        >
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1800&auto=format&fit=crop"
            alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B07]/90 via-[#0D0B07]/60 to-transparent" />

          <div className="relative z-10 px-10 md:px-16 lg:px-20 py-16 max-w-2xl">
            <p className="eyebrow text-[#D4AF7A] mb-5">Start Planning</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-white leading-tight mb-5">
              Your Love Story.<br />Your Family Time.<br /><em className="text-[#D4AF7A]">One Perfect Journey.</em>
            </h2>
            <p className="text-white/55 text-base mb-10 max-w-md leading-relaxed">
              Tell us your dream — we'll design a trip crafted just for you. No templates. No rush. Only unforgettable moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate("/contact")} className="btn-gold">
                Plan My Trip <ArrowRight className="w-4 h-4" />
              </button>
              <a href="tel:+918090988780" className="btn-outline">
                <Phone className="w-4 h-4" /> Call an Expert
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
