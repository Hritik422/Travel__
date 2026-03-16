import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-[#0E0C0A] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
          alt="404" loading="lazy" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A] via-[#0E0C0A]/60 to-transparent" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="inline-block mb-8 text-[#B8965E]">
            <Compass className="w-16 h-16 opacity-70" />
          </motion.div>
          <p className="text-[10px] text-[#B8965E] uppercase tracking-[0.4em] font-bold mb-5">Error 404</p>
          <h1 className="font-display text-6xl md:text-8xl text-white mb-6 italic leading-tight">
            Uncharted<br /><span className="not-italic text-[#D4AF7A]">Territory</span>
          </h1>
          <div className="w-20 h-px bg-[#2A2420] mx-auto mb-8" />
          <p className="text-lg text-[#6B5F54] font-light leading-relaxed mb-12">
            It seems you've wandered off the map. This destination does not exist, or has been moved.
          </p>
          <button onClick={() => navigate("/")}
            className="group relative px-8 py-4 bg-white text-[#0E0C0A] font-bold uppercase text-xs tracking-widest overflow-hidden transition-transform active:scale-95 rounded-sm"
          >
            <div className="absolute inset-0 bg-[#EDE8E0] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return Home
            </span>
          </button>
        </motion.div>
      </div>
      <div className="absolute bottom-10 text-[#3D2E22] text-[10px] uppercase tracking-[0.3em]">Coordinates: Unknown</div>
    </div>
  );
}
